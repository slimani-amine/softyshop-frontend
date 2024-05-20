import { useEffect, useState } from "react";
import Store from "../components/Store/Store";
import { BASE_URL } from "@src/modules/auth/data/authThunk";
import { Pagination } from "antd";
function Home() {
  const [Stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const perPage = 9;

  const fetchData = async (page: number, perPage: number) => {
    try {
      const response = await fetch(
        `${BASE_URL}api/stores?isPublished=true&perPage=${perPage}&page=${page}`
      );
      const data = await response.json();
      const publishedStores = data.data.docs.filter((product: any) => {
        return product.isPublished;
      });
      setStores(publishedStores);
      setTotalRecords(data.data.meta.totalRecords);
    } catch (err: string | unknown) {
      console.error(err);
      return err;
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 0 36px 24px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "auto",
            gridGap: "1rem",
          }}
        >
          {Stores?.map(
            (
              {
                name,
                logo,
                phoneNumber,
                address,
                id,
                isPublished,
                location,
                socialMediaLinks,
              },
              index
            ) => (
              <Store
                key={index}
                id={id}
                name={name}
                address={address}
                phoneNumber={phoneNumber}
                logo={logo}
                isPublished={isPublished}
                location={location}
                socialMediaLinks={socialMediaLinks}
              />
            )
          )}
        </div>
        <Pagination
          current={currentPage}
          total={totalRecords}
          pageSize={perPage}
          onChange={handlePageChange}
          style={{
            display: "flex",
            justifyContent: "end",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
      </div>
    );
  }
}
export default Home;
