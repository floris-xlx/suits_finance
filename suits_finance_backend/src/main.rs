//! # Finance API
//! 
//! This is a library for the Finance API.

// FIXME: this should be removed before production
#![allow(unused_imports)]
#![allow(dead_code)]
#![allow(unused_variables)]

// imports
use tracing::{info, error, warn, debug, trace};


// crate imports
use suits_finance_api::client;


#[tokio::main]
async fn main() {
    client().await;
}
