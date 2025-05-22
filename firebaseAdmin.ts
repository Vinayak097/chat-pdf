import { initializeApp ,getApps,App,getApp,cert} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import servicekey from "./service_key.json" with { type: "json" };


let app:App;

if(getApps().length==0){
    app=initializeApp({
        credential: cert({
            projectId: servicekey.project_id,
            clientEmail: servicekey.client_email,
            privateKey: servicekey.private_key,
        }),
    });
}else{
    app=getApp();
}

const adminDb=getFirestore(app);
const storage=getStorage(app)

export {app as adminApp,adminDb , storage as adminStorage};


