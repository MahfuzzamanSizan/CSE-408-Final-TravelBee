import useFetch from "../../hooks/useFetch";
import "./propertyList.css"

const PropertyList = () => {

  const { data, loading, error} = useFetch("http://localhost:8000/api/hotels/countByType");

  const images= [
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/379757616.jpg?k=82d1fe93dda214b7f4c77d9d3eb69e3468f5fed19f5c04c8a70ad93a2fdcad64&o=&hp=1",
    "https://www.phillyaptrentals.com/wp-content/uploads/2020/07/which-apartment-floor-to-live-on-scaled.jpg",
    "https://digital.ihg.com/is/image/ihg/intercontinental-maldives-club-3x2",
    "https://www.fourseasons.com/alt/img-opt/~80.610.0,1111-0,0000-2113,7778-1189,0000/publish/content/dam/fourseasons/images/web/GHF/GHF_2627_aspect16x9.jpg",
    "https://www.hoteliermiddleeast.com/cloud/2023/02/23/08nKT88l-Terra-Cabin-3-1200x900.jpg"
  ]

  return (
    <div className="pList">
      {loading ? (
        "Loading please wait..."
        ) :
        (<>
        
        {data && images.map((img,i) => (<div className="pListItem" key = {i}>
        <img width="300px" height="250px" src={img} alt="" className="pListImg" />
        <div className="pListTitles">
            <h1>{data[i]?.type}</h1>
            <h2>{data[i]?.count} {data[i]?.type}</h2>
        </div>
      </div>))}

      </>)}

    </div>
  )
}

export default PropertyList
