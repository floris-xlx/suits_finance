//! ## Suits Finace API
//! 
//! This is a library for the Suits Finance API.


// flags
// FIXME: this should be removed before production
#![allow(unused_imports)]
#![allow(dead_code)]
#![allow(unused_variables)]

// imports
use tracing::{info, error, warn, debug, trace};
use supabase_rs::SupabaseClient;


// re-export init_tracing
pub use crate::telemetry::trace_client::init_tracing;
pub use crate::telemetry::colors;
pub use crate::data::supabase_client::initialize_supabase_client;
pub use crate::api::client::api_client;





// exports
pub mod api;
pub mod data;
pub mod telemetry;
pub mod tests;
pub mod utils;

// tests


// build scripts


// main
pub async fn client() {
    init_tracing();
    info!("{}", colors::cyan("Started the tracing client.."));

    let client: SupabaseClient = initialize_supabase_client().await;

    if let Err(e) = api_client().await {
        error!("{}", colors::red(&format!("Failed to start API client: {}", e)));
    }

    info!("Hello, world!");
}
