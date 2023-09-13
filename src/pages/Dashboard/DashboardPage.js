import { useEffect, useState } from 'react';
import { useTitle } from '../../hooks/useTitle';
import { DashboardEmpty } from './components/DashboardEmpty';
import { DashboardCart } from './components/DashboardCart';
import { getUserOrders } from '../../services';
import { toast } from 'react-toastify';

export const DashboardPage = () => {

    const [orders, setOrders] = useState([]);
    useTitle("Dashboard");
    useEffect(() => {

        async function fetchOrders(){
          try{
            const data = await getUserOrders();
            setOrders(data);
          }catch(error){
            toast.error(error.message);
          }
        }
        fetchOrders();
    }, [])

    return (
      <main>
        <section>
          <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
        </section>

        <section>
            { orders.length && orders.map((order) => (
                <DashboardCart key={order.id} order={order} />
            )) }
        </section>

        <section>
            { !orders.length && <DashboardEmpty /> }
        </section>
      </main>
    )
  }
  