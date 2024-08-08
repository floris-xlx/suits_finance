// imports
use dotenv::dotenv;
use std::env::var;
use supabase_rs::SupabaseClient;
use tracing::{debug, error, info, trace, warn};

// crate imports
use crate::colors;


/// Initialize the Supabase client
pub async fn initialize_supabase_client() -> SupabaseClient {
    info!("{}", colors::green("Initialized the Supabase client.."));

    dotenv().ok(); // Load the .env file

    let supabase_url = match var("SUPABASE_URL") {
        Ok(url) => url,
        Err(e) => {
            error!(
                "{}",
                format!(
                    "{}",
                    colors::red(&format!("Error loading SUPABASE_URL: {}", e))
                )
            );

            String::new() // Return an empty string in case of error
        }
    };


    let supabase_key = match var("SUPABASE_KEY") {
        Ok(key) => key,
        Err(e) => {
            error!(
                "{}",
                format!(
                    "{}",
                    colors::red(&format!("Error loading SUPABASE_KEY: {}", e))
                )
            );
            String::new() // Return an empty string in case of error
        }
    };

    SupabaseClient::new(supabase_url, supabase_key)
}
