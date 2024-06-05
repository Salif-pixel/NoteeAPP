
import Landing1 from "../../layout/widget/landingsection/section1.jsx";
import Landing2 from "../../layout/widget/landingsection/section2.jsx";
import Landing3 from "../../layout/widget/landingsection/section3.jsx";
import Landing4 from "../../layout/widget/landingsection/section4.jsx";
export default function Contentlanding({scope}){


    return (

        <div ref={scope}
             className={`w-full backdrop-blur-lg  overflow-hidden  h-[calc(100vh-12vh)]  `}>
            <div id={`landing`} className={`w-screen backdrop-blur-lg h-screen`}>
                <Landing1 id={`landing1`}/>
                <Landing2 id={`landing2`}/>
                <Landing3 id={`landing3`}/>
                <Landing4 id={`landing4`}/>
              </div>


        </div>
    )
}


