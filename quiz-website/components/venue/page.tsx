






function Venue() {
  return (
    <>
     <div id="venue" className="w-full md:h-screen flex flex-col justify-center z-50" >
        <h1 className="text-white text-center text-4xl md:text-5xl  font-extrabold  pt-5 ">VENUE</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 h-[80%] md:p-10 md:px-20">
            <div className="map md:h-[100%] h-[400px] w-[100%]  p-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.1560221183868!2d88.36863217439931!3d22.498328635690086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271236069f175%3A0xcee7537188e8fa9c!2sDr.%20Triguna%20Sen%20Auditorium!5e0!3m2!1sen!2sin!4v1735505632854!5m2!1sen!2sin"  width="100%" height="100%"   loading="lazy" ></iframe>
            </div>
            <div className="venueblocks  w-[100%] grid grid-cols-1 gap-10 p-10 ">
                <p className="border-4 rounded-xl p-5 md:p-10 text-center md:text-start bg-white"><b>DR. TRIGUNA SEN AUDITORIUM</b> :
                188, Raja Subodh Chandra Mallick Rd, Jadavpur University Campus Area, Jadavpur, Kolkata, West Bengal 700032</p>
                <p className="border-4 rounded-xl p-5 md:p-10 text-center md:text-start bg-white"><b>Amitava Dey Memorial Hall</b> :
                Department of Computer Science and Engineering,188, Raja Subodh Chandra Mallick Rd, Jadavpur University Campus Area, Jadavpur, Kolkata, West Bengal 700032</p>
                

            </div>

        </div>
     </div>
    
    </>
  )
}

export default Venue