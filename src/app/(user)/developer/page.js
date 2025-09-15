"use client";

import Image from "next/image";
import Header from "../header/page";
import Sidebar from "../sidebar/page";

const developers = [
  {
    name: "Jagodana Meet M",
    cno: "7861900950",
    class: "TY_BCA_D",
    roll: "24",
    address: "Surat",
    email: "meetjagodana29@gmail.com",
    img: "/meet.webp",
  },
  {
    name: "Kuvadiya Jay D",
    cno: "9327728667",
    class: "TY_BCA_D",
    roll: "30",
    address: "Variyav",
    email: "jaykuvadiya@gmail.com",
    img: "/jay.jpg",
  },
  {
    name: "Vaghani Akhst P",
    cno: "7984074726",
    class: "TY_BCA_D",
    roll: "84",
    address: "Katargam",
    email: "akshat29@gmail.com",
    img: "/akshat.jpg",
  },
];

export default function DevelopersPage() {
  return (
    <div>
      <Header/>
      <Sidebar/>
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/6 bg-white min-h-screen shadow-md">{/* Sidebar placeholder */}</div>

      {/* Main Content */}
      <div className="w-5/6 p-8">
        <h2 className="text-center text-purple-800 text-5xl font-bold mb-12">
          Welcome To Our Developers Page
        </h2>

        {developers.map((dev, index) => (
          <section key={index} className="mb-12">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden p-6">
              <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
                <Image
                  src={dev.img}
                  alt={dev.name}
                  width={300}
                  height={300}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="md:w-1/2 md:pl-6 text-center md:text-left">
                <h3 className="text-2xl font-forte mb-2">{dev.name}</h3>
                <p className="text-gray-700">
                  Cno: {dev.cno} <br />
                  Class: {dev.class} <br />
                  Roll No: {dev.roll} <br />
                  Address: {dev.address} <br />
                  E-mail: {dev.email}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
    </div>
  );
}
