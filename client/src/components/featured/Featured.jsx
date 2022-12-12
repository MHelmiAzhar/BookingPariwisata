import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch("/wisata/countByCity?cities=jakarta,bandung,malang");

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src="https://images.unsplash.com/photo-1611637405506-e6e6ca710362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW9uYXN8ZW58MHx8MHx8&auto=format&fit=crop&w=1100&q=60" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Jakarta</h1>
              <h2>{data[0]} destinasi</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgPjh1AZGXyOyWr21dpGLK0xnjH1Ai4GZQpQ&usqp=CAU" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Bandung</h1>
              <h2>{data[1]} destinasi</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src="https://images.unsplash.com/photo-1559628151-ef85aab5bb21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFsYW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Malang</h1>
              <h2>{data[2]} destinasi</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
