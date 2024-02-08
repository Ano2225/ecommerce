'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice';
import Heading from '@/app/components/Heading';
import Status from '@/app/components/Status';
import {  MdClose, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md';
import ActionBtn from '@/app/components/ActionBtn';
import { useRouter } from 'next/navigation';
import {Order} from '@prisma/client';
import {User} from '@prisma/client';
import moment from 'moment';
import 'moment/locale/fr';


interface OrdersClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
  user: User
}

const OrdersClient: React.FC<OrdersClientProps> = ({orders}) => {
    const router = useRouter();

  
    let rows: any = [];

    if (orders) {
        rows = orders.map((order) => {
          moment.locale('fr');
            return {
                id: order.id,
                customer: order.user.name,
                amount:formatPrice(order.amount),
                adminDepositNumber: order.adminDepositNumber,
                userDepositNumber: order.userDepositNumber,
                userPhoneNumber: order.userPhoneNumber,
                address: order.address,
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            };
        });
    }
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'customer', headerName: 'Nom du client', width: 130 },
        {
            field: 'amount',
            headerName: 'Prix(FCFA)',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className='font-bold text-slate-800'>
                        {params.row.amount}
                    </div>
                );
            }
        },
        {
          field:'adminDepositNumber',
          headerName: 'Numero ayant recu le depot',
          width: 245
        },
        {
          field:'userDepositNumber',
          headerName: 'Numero du depot',
          width:180
        },
        {
          field:'userPhoneNumber',
          headerName: 'Numero à contacter',
          width: 195
        },
        {
          field:'address',
          headerName: 'Adresse',
          width: 195
        },
        {
            field: "paymentStatus",
            headerName: "Statut du paiement",
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.paymentStatus === "En attente" ? (
                            <Status
                                text="En attente"
                                icon={MdClose}
                                bg='bg-purple-200'
                                color='text-slate-700'
                            />
                        ) : (
                            <Status
                                text="Payé"
                                icon={MdDone}
                                bg='bg-green-200'
                                color='text-green-700'
                            />
                        )}
                    </div>
                );
            }
        },
        {
            field: "deliveryStatus",
            headerName: 'Statut de livraison',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className='font-bold text-slate-800'>
                        {params.row.deliveryStatus === 'En attente' ?
                            (<Status
                                text={"En attende"}
                                icon={MdDeliveryDining}
                                bg='bg-rose-200'
                                color='text-rose-700'
                            />
                            ) : params.row.deliveryStatus === "Livré" ? ( 
                                <Status
                                    text={"Livré"}
                                    icon={MdDone}
                                    bg='bg-teal-200'
                                    color='text-teal-700'
                                    
                                />
                            ): <></>
                        }
                    </div>
                );
            }
        },
        {
            field:'date',
            headerName:"Date",
            width:140
          },
        {
            field: "action",
            headerName: "Actions",
            width: 130,
            renderCell: (params) => {
                return (
                    <div
                        className='flex justify-between gap-4 w-full'
                    >
                        <ActionBtn icon={MdRemoveRedEye} onClick={() => 
                          { router.push(`/order/${params.row.id}`) }} />
                    </div>
                );
            }
        }
    ];
    



  return (
   <div className='max-w-[1150px] m-auto text-xl'>
    <div className='mb-4 mt-8'>
        <Heading  title='Mes commandes' center/>
    </div>
    <div style={{height:600, width: "100%" }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 9 },
             },
            }}
            pageSizeOptions={[9, 20]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    </div>
   </div> 
  )
}

export default OrdersClient
