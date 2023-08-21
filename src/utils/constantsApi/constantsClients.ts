import 'dotenv/config'

export const BASE_URL = process.env.BASE_URL || '';
export const BASE_PROJECT_KEY = process.env.BASE_PROJECT_KEY || '';
export const BASE_AUTH_URL = process.env.BASE_AUTH_URL || '';

// DEVELOP
export const DEVELOP_SECRET = process.env.DEVELOP_SECRET || '';
export const DEVELOP_ID = process.env.DEVELOP_ID || '';
//  don't know if it's correct to put OR empty array
export const DEVELOP_SCOPES = process.env.DEVELOP_SCOPES || '';

// USER
export const USER_SECRET = process.env.USER_SECRET || '';
export const USER_ID = process.env.USER_ID || '';
//  don't know if it's correct to put OR empty array
export const USER_SCOPES = process.env.USER_SCOPES || [];
