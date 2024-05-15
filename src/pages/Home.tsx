import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchExpanses } from "../action/expanses";
import { useLocalStorage } from "../hooks";

export default function Home() {
  const username = useLocalStorage('username');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { expanses } = useAppSelector(state => state.expanses)
  
  
  useEffect(() => {
    if (!username) {
      const timeout = setTimeout(() => navigate("/login"), 3000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      dispatch(fetchExpanses({ username }));
    }
  }, [username])

  return (
    <div className="h-full flex flex-col relative p-4">
      {username ? <>
        <h1 className="font-bold text-xl">Hi {username}, here is your expanses data</h1>
        <table className="table-auto mt-4 border border-black">
          <thead>
            <tr>
              <th><span className="font-bold">Date</span></th>
              <th><span className="font-bold">Amount</span></th>
              <th><span className="font-bold">Category</span></th>
              <th><span className="font-bold">Note</span></th>
            </tr>
          </thead>
          <tbody>
            {expanses?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{item.category}</td>
                  <td>{item.note}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Link to="/expanse">
          <button className="rounded-full py-4 px-6 bg-red-500 fixed bottom-1 right-1 text-white font-bold text-xl">+</button>
        </Link>
      </> : <h1 className="font-bold text-xl">You have not log in, we directing you to login page...</h1>}
    </div>
  )
}