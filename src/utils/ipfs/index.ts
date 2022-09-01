import { Buffer } from "buffer";
import { create as ipfsHttpClient } from "ipfs-http-client";
import env from "react-dotenv";
import { IPFS_CONNECTION_URL } from "../constants";

const projectId = env.INFURA_PROJECT_ID; // <---------- your Infura Project ID

const projectSecret = env.INFURA_PROJECT_SECRET; // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const client = ipfsHttpClient({
  url: IPFS_CONNECTION_URL,
  headers: { authorization: auth },
});
