
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://192.168.8.192'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"
const supabase = createClient(supabaseUrl, supabaseKey)

async function signup() {
  try {
    const { data, error } = await supabase.auth.signInAnonymously({

    });


    if (error) {
      throw error;
    }

    console.log("User signed up:", data);
  } catch (error) {
    console.error("Signup error:", error);
  }
}

export { supabase, signup };

