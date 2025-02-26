
export {auth as middleware} from '@/auth'


export const config = {
    runtime : "nodejs",
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    unstable_allowDynamic: [
        // allows a single file
        "/src/db/lib/dbConnect.js",
        // use a glob to allow anything in the function-bind 3rd party module
        "/node_modules/mongoose/dist/**",
    ],
}
