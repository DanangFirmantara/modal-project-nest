import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Injectable()
export class HousesService {

    private houses = [
        {
            id: 0,
            name: "Acme Fresh Start Housing",
            city: "Chicago",
            state: "IL",
            photo: "https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
            availableUnits: 4,
            wifi: true,
            laundry: true
        },
        {
            id: 1,
            name: "A113 Transitional Housing",
            city: "Santa Monica",
            state: "CA",
            photo: "https://angular.io/assets/images/tutorials/faa/brandon-griggs-wR11KBaB86U-unsplash.jpg",
            availableUnits: 0,
            wifi: false,
            laundry: true
        },
        {
            id: 2,
            name: "Warm Beds Housing Support",
            city: "Juneau",
            state: "AK",
            photo: "https://angular.io/assets/images/tutorials/faa/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
            availableUnits: 1,
            wifi: false,
            laundry: false
        },
    ]

    getAllHouse(){
        return {
            results: this.houses
        }
    }

    getHouseById(id: number){
        const house = this.houses.find(item => item.id === id)

        if(!house){
            throw error('House not found')
        }

        return house
    }

    createNewHouse(createHouseDto: CreateHouseDto){
        const newId = this.houses.length
        const newHouse = {
            id : newId,
            ...createHouseDto
        }
        this.houses = [
            ...this.houses,
            newHouse
        ]

        return {
            message : "Create New House Success",
            result : createHouseDto
        }
    }

    updateHouse(id: number, updateHouseDto: UpdateHouseDto){
        const house = this.houses.find(item => item.id === id)
        if(!house){
            throw error('House not found')
        }

        this.houses = this.houses.map((item) => {
            if(item.id === id){
                return { ...item, updateHouseDto }
            }
            return item
        })

        return this.getHouseById(id)
    }

    removeHouse(id: number){
        const toBeRemoved = this.getHouseById(id)

        this.houses = this.houses.filter(item => item.id !== id)

        return {
            messsage : "House Deleted!",
            result : toBeRemoved
        }

    }
}
