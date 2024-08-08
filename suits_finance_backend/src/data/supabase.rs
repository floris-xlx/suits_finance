use supabase_rs::SupabaseClient;

use dotenv::dotenv;
use std::env::var;
    

pub async fn initialize_supabase_client() -> SupabaseClient {
    dotenv().ok(); // Load the .env file

    let supabase_url = match var("SUPABASE_URL") {
        Ok(url) => url,
        Err(e) => {
            eprintln!("Error loading SUPABASE_URL: {}", e);
            String::new() // Return an empty string in case of error
        }
    };

    let supabase_key = match var("SUPABASE_KEY") {
        Ok(key) => key,
        Err(e) => {
            eprintln!("Error loading SUPABASE_KEY: {}", e);
            String::new() // Return an empty string in case of error
        }
    };

    SupabaseClient::new(supabase_url, supabase_key)
}
