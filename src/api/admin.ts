import { RealtimeChannel, RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { supabase } from "../supabase";

export const CreateRoom = async (RoomCode: string) => {


    const { data: { user } } = await supabase.auth.getUser()

    try {
        const { data, error } = await supabase
            .from('rooms')
            .insert([
                { id: RoomCode, leader: user?.id },
            ])
            .select()
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error creating room:", error);
    }
};
// Subscribe to Room Changes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SubscribeToRoom = (RoomCode: any, callback: (arg0: RealtimePostgresChangesPayload<{ [key: string]: any; }>) => void) => {
    const channel = supabase
        .channel('room-channel') // Unique channel name
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'Rooms', filter: `RoomCode=eq.${RoomCode}` },
            (payload) => {
                console.log("Change received:", payload);
                callback(payload);
            }
        )
        .subscribe();

    return channel; // Return subscription so it can be unsubscribed
};
// Unsubscribe from Room Changes
export const UnsubscribeFromRoom = (channel: RealtimeChannel) => {
    supabase.removeChannel(channel);
};

type gameData = {
    id: number;
    question: string;
    answer: string;
};


export const getQuestions = async (): Promise<gameData | null> => {
    const randomQuestionId = Math.floor(Math.random() * 1106) + 1;
    try {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('id', randomQuestionId)
            .limit(1);

        if (error) {
            throw error;
        }

        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Error fetching question:", error);
        return null;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPlayers = async (RoomCode: any): Promise<any[]> => {
    try {
        const { data, error } = await supabase
            .from('Rooms')
            .select('players')
            .eq('RoomCode', RoomCode)
            .single();

        if (error) {
            throw error;
        }
        console.log("Players:", data?.players);

        return data?.players || [];
    } catch (error) {
        console.error("Error fetching players:", error);
        return [];
    }
}
export const test = async () => {
    try {
        const { data, error } = await supabase
            .from('Rooms')
            .insert([
                {
                    id: 'room1',
                    players: [
                        { id: 1, name: "Player1", score: 10 },
                        { id: 2, name: "Player2", score: 15 }
                    ],
                    Queue: [
                        { id: 1, name: "Player1" },
                        { id: 2, name: "Player2" }],
                    Leader: "Player1"
                }
            ])
            .select();

        if (error) console.error('Insert Error:', error);
        else console.log('Room created:', data);

    } catch (error) {
        console.error("Error fetching players:", error);
        return [];
    }
}
