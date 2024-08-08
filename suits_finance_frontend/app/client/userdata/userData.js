"use client";

import {GetKeyLocalStorage} from "@/app/client/caching/LocalStorageRouter";




import { 
    GetUserNameById, 
    GetProfilePicById,
    GetOrganizationByUserId
} from "@/app/client/supabase/SupabaseUserData";

// central routing logic for getting username and profile pic and other user data

function getUsername () {
    // try to get username from local storage if it exists
    const username = GetKeyLocalStorage('username');

    // if username is not in local storage, get it from supabase with the user id
    if (!username) {
        const userId = GetKeyLocalStorage('userId');
        
        if (userId) {
            GetUserNameById(userId).then((response) => {
                return response;
            });
        }
    }
    
    return username;
}


function getProfilePic() {
    // try to get profile pic from local storage if it exists
    const profilePic = GetKeyLocalStorage('profilePic');

    // if profile pic is not in local storage, get it from supabase with the user id
    if (!profilePic) {
        const userId = GetKeyLocalStorage('userId');
        
        if (userId) {
            GetProfilePicById(userId).then((response) => {
                return response;
            });
        }
    }

    return profilePic;
}


function getOrganization() {
    // try to get organization from local storage if it exists
    const organization = GetKeyLocalStorage('organization');

    // if organization is not in local storage, get it from supabase with the user id
    if (!organization) {
        const userId = GetKeyLocalStorage('userId');
        
        if (userId) {
            return GetOrganizationByUserId(userId).then((response) => {
                return response;
            });
        }
    }

    return organization;
}



export {
    getUsername,
    getProfilePic,
    getOrganization
}