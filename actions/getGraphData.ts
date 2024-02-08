import prisma from '@/libs/prismadb';
import moment from "moment";
import 'moment/locale/fr'; 


moment.locale('fr');

export default async function getGraphData() {
    try {
        //Get the start end and end dates for the data range(7 days ago to today)
        const startDate = moment().subtract(6, 'days').startOf("day");
        const endDate = moment().endOf('day');

        //query the db to get order data grouped by createdDate
        const result = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
                status:'Payé'
            },
            _sum: {
                amount: true
            },
        });

        //Initialize an object to aggregate the data by day
        const aggregatedData: {
            [day: string]: {
                day: string,
                date: string,
                totalAmount: number
            };
        } = {};

        //create a clone of the start date toiterate over each day
        const currentDate = startDate.clone();

        while (currentDate <= endDate) {
            const day = currentDate.format('dddd');
            console.log("jour <<", day, currentDate); // Ajout de cette ligne pour vérifier la date actuelle
        
            aggregatedData[day] = {
                day, 
                date: currentDate.format('YYYY-MM-DD'), // Correction du format de date
                totalAmount: 0
            };
        
            currentDate.add(1, "day");
        }
        

        result.forEach((entry) => {
            const day = moment(entry.createDate).format("dddd");
            const amount = entry._sum.amount || 0;
            aggregatedData[day].totalAmount += amount;

        });

        const formattedData = Object.values(aggregatedData).sort((a,b) => {
          return  moment(a.date).diff(moment(b.date))
        });


        return formattedData;



    }catch(error: any) {
        // Handle errors
        console.error("Error in getGraphData:", error);
        throw error;
    }
}