let token = 'fb4e64cafa3942ca50158b1958c128ac'


export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://marvel-character-api.glitch.me/api/all_characters`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://marvel-character-api.glitch.me/api/all_characters`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },


    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://marvel-character-api.glitch.me/api/all_characters/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }
        console.log(`successfully updated drone with id ${id}`)
    },

    

    delete: async(id:string) => {
       const response = await fetch(`https://marvel-character-api.glitch.me/api/all_characters/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if(!response.ok){
            throw new Error('Failed to delete data')
        }

    },
    
    }
