''

const Background = () => {

    return (
        <div className="flex-1 p-2 h-screen overflow-hidden relative  ">

          <div className="h-full relative w-full ">
            <div className="bg-gradient-to-br h-full w-full rounded-xl from-black to-transparent absolute z-20 " />
            <div className="z-20 absolute  p-24">
              <h1 className="text-8xl max-w-2xl font-medium font-bricolage px-2 text-neutral-100">Digital platform for creating quizzes and QCMs.</h1>
            </div>
            <div className="h-full rounded-lg">
            <video
             src="https://res.cloudinary.com/dpwnw6ltb/video/upload/v1740683803/wirntpv6c0arc7pvyoge.mp4"
              width="320" height="240"
              loop
              muted
              autoPlay
              className="h-full w-full object-cover rounded-2xl"

            >
               <source src="/public/background.mp4" type="video/mp4" />
            </video>

            </div>
          </div>
        </div>
      );
}

export default Background
