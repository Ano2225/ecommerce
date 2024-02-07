'use client'

import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import { formatPrice } from '@/utils/formatPrice';
import {Order} from '@prisma/client';
import { MdAccessTimeFilled, MdDone } from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/fr'; 
import OrderItem from './OrderItem';

interface OrderdetailsProps {
    order: Order
}

const Orderdetails:React.FC<OrderdetailsProps> = ({order}) => {
    moment.locale('fr');

  return (
    <div
     className='max-w-[1150px]
     m-auto
     flex
     flex-col
     gap-2
     '
     >
      <div className='mt-8'>
        <Heading  title='Details de commande'/>
      </div>
      <div>ID commande : {order.orderId}</div>
      <div>
        Total Montant: {""}
        <span className='font-bold'>{formatPrice(order.amount)}</span>
      </div>
      <div className='flex gap-2 items-center'>
        <div>Statut de paiement:</div>
        <div>
            {order.status ==="En attente" ?(
            < Status
            text="En attente"
            icon={MdAccessTimeFilled}
            bg='bg-slate-200'
            color='text-slate-700'
             />) : (
                < Status
                text="Payé"
                icon={MdDone}
                bg='bg-green-200'
                color='text-green-700'
                />
             )}
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <div>Statut de livraison:</div>
        <div>
            {order.deliveryStatus ==="En attente" ?(
            < Status
            text="En attente"
            icon={MdAccessTimeFilled}
            bg='bg-slate-200'
            color='text-slate-700'
             />) 
             : (
                < Status
                text="Livré"
                icon={MdDone}
                bg='bg-green-200'
                color='text-green-700'
                />
             )}
        </div>
      </div>
      
      <div>Date: {moment(order.createDate).fromNow()}</div>
      <div>
        <h2 className='font-semibold mt-4 mb-2'>Article commandés</h2>
        <div className='grid grid-cols-5 text-s gap-4 pb-2 items-center'>
            <div className='col-span-2 justify-self-start'>
                ARTICLE
            </div>
            <div className='justify-self-center'>PRIX</div>
            <div className='justify-self-center'>QUANTITE</div>
            <div className='justify-self-end'>TOTAL</div>
        </div>
        {
            order.products && 
            order.products.map((item) => {
                return <OrderItem key={item.id} item={item}></OrderItem>
            })
        }
      </div>
    </div>
  )
}

export default Orderdetails
