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

// re-export init_tracing
pub use crate::telemetry::trace_client::init_tracing;
pub use crate::telemetry::colors;





// exports
pub mod api;
pub mod data;
pub mod telemetry;


// tests


// build scripts


// main
pub async fn client() {
    init_tracing();
    info!("{}", colors::cyan("Started the tracing client.."));




    info!("Hello, world!");
}