"use server"
import { auth } from "@clerk/nextjs/server";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";



import { PineconeStore } from "@langchain/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import pc from "./pinecone";
import { adminDb } from "@/firebaseAdmin";

const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACE_API_KEY,
    model: "sentence-transformers/all-mpnet-base-v2"
});
// import { ChatGroq } from "@langchain/groq";

// const llm = new ChatGroq({
//   model: "llama-3.3-70b-versatile",
//   temperature: 0
// });
// const llm = new ChatOpenAI({
//     modelName: "gpt-3.5-turbo-instruct-0914",
//     temperature: 0,
//     openAIApiKey: process.env.OPENAI_API_KEY,
// });

 const indexName = 'chat-pdf';
export async function generateDocs(docId:string) {
    const {userId}=await auth();
    if(!userId){
        throw new Error("User not found")
    }
    //fetching download url form firebase
    console.log('fetching download url form firebase')
    const firebaseRef= await adminDb
    .collection('users')
    .doc(userId)
    .collection('files')
    .doc(docId)
    .get();

    const downloadUrl=  firebaseRef.data()?.downloadUrl;

    if(!downloadUrl){
        throw new Error("download url not found")
    }
    //pdf fetch
    const response=await fetch(downloadUrl)
    //load pdf into pdfobject
    const data= await response.blob();
    //load pdf from specifiec path
    const Loader=new PDFLoader(data)
    const docs= await Loader.load();

    //spliting the doc into smaller parts
    const spliter=new RecursiveCharacterTextSplitter()

    const splitDocs=await spliter.splitDocuments(docs)

    console.log(`----- split into ${splitDocs.length , splitDocs[0]} parts -- `)   
    return splitDocs
}
async function namespaceExists(index: any, namespace: string) {
    if(namespace==null) throw new Error("No namespace values provided") ;
    try {
        
        await index.describe(namespace);
        return true;
    } catch (error) {
        return false;
    }
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
        
    }

    let pineconeVectorStore;

    console.log("----Generating embeddings....----");
    

    const index = await pc.index(indexName);
    if(!index){
        console.log("index not exist" , index)
        return null
    }
    const namespaceExist = await namespaceExists(index, docId);
    console.log("namespace exist " , namespaceExist)
    if (namespaceExist) {
        // Load PDF and split into text chunks
        console.log("namespace dockid alearedy exist using existembeddings ")
        console.log("----Loading PDF----");

         pineconeVectorStore=await PineconeStore.fromExistingIndex(embeddings,{
            pineconeIndex:index,
            namespace:docId
        })
        console.log("vecotore stored ",pineconeVectorStore)
    }else{
        const splitDoc= await generateDocs(docId);
        console.log("craet splidoc")
        try{
            pineconeVectorStore=await PineconeStore.fromDocuments(
            splitDoc,
            embeddings,
            {
                pineconeIndex:index,
                namespace:docId
            }
        )

        }catch(e:any){
            console.log("error craeteing namessspce storegin ", e.message )
        }
        
        console.log("vecotore stored ",pineconeVectorStore)
    }

    return pineconeVectorStore;
}


/*
to get vectore embeddings


initilize pinocone client and llm using langchain 

with indexname get index 
check namespace(docId) is  alerady exist 
if so get vector from pinocone store fromexistingindex
else 
need to genrate vector get pdf from firstore using docId
split into chunks with splitter instance of recursivetext somthing 
call pinecone.documensts upload split doc  , resp vecotrestore
and return 
*/