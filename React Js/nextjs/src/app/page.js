import Image from "next/image";
import Home from "./Components/Home";
import { menProductAPI, womenProductAPI } from "@/services/homeApi";

export default async function page() {

  var menProducts = await menProductAPI();
  var womenProducts = await womenProductAPI();

  return (
    <>
      <Home menProducts={ menProducts } womenProducts = {womenProducts}/>
    </>
  );
}
