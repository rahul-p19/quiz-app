






function Venue() {
  return (
    <>
     <div id="venue" className="w-full md:h-screen flex flex-col justify-center" >
        <h1 className="text-white text-center text-4xl md:text-5xl text-bold  ">Venue</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 h-[80%] md:p-10 md:px-20">
            <div className="map md:h-[100%] h-[400px] w-[100%]  p-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.1560221183868!2d88.36863217439931!3d22.498328635690086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271236069f175%3A0xcee7537188e8fa9c!2sDr.%20Triguna%20Sen%20Auditorium!5e0!3m2!1sen!2sin!4v1735505632854!5m2!1sen!2sin"  width="100%" height="100%"   loading="lazy" ></iframe>
            </div>
            <div className="venueblocks  w-[100%] grid grid-cols-1 gap-10 p-10 ">
                <p className="border-4 rounded-xl p-5 md:p-10 text-center md:text-start bg-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, perspiciatis obcaecati excepturi quam modi libero, tempora eligendi voluptatum quo dolor error accusamus eveniet neque rerum assumenda rem illo aspernatur iste.</p>
                <p className="border-4 rounded-xl p-5 md:p-10 text-center md:text-start bg-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quo dolores modi at magni inventore deleniti facere atque minima iste ut quam in! Dolorem autem quae repellat voluptates soluta iusto?</p>
                

            </div>

        </div>
     </div>
    
    </>
  )
}

export default Venue