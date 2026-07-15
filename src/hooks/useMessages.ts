import { useCallback, useEffect, useState } from "react";
import {
  supabase,
  isSupabaseConfigured,
  type GuestMessage,
} from "../lib/supabase";

type SubmitResult = { ok: boolean };

export function useMessages() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);

  const fetchMessages = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error && data) {
      setMessages(data as GuestMessage[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setLoading(false);
      return;
    }

    fetchMessages();

    // Live updates: append any newly inserted message in real time.
    const channel = client
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const incoming = payload.new as GuestMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === incoming.id)) return prev;
            return [...prev, incoming];
          });
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, [fetchMessages]);

  const addMessage = useCallback(
    async (name: string, message: string): Promise<SubmitResult> => {
      if (!supabase) return { ok: false };
      const { data, error } = await supabase
        .from("messages")
        .insert({ name, message })
        .select()
        .single();

      if (error || !data) return { ok: false };

      // Optimistically add in case the realtime event is delayed.
      const inserted = data as GuestMessage;
      setMessages((prev) => {
        if (prev.some((m) => m.id === inserted.id)) return prev;
        return [...prev, inserted];
      });
      return { ok: true };
    },
    []
  );

  return {
    messages,
    loading,
    addMessage,
    isConfigured: isSupabaseConfigured,
  };
}
