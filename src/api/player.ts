/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "../supabase";


export const PlayerJoinRoom = async (RoomCode: string, PlayerName: string) => {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('rooms')
            .update({
                players: [
                    { id: user?.id, name: PlayerName, score: 0 },
                ]
            })
            .eq('id', RoomCode)  // Update based on RoomCode
            .select();

        if (error) {
            throw error;
        }
        console.log("Room updated:", data);

        return data;
    } catch (error) {
        console.error("Error creating room:", error);
    }
};

export const getPlayers = async ( RoomCode: any): Promise<any[]> => {
    try {
        const { data, error } = await supabase
        .from('Rooms')
        .select('players')
        .eq('id', RoomCode)
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
  