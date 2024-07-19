const API = {
    url:'data/menu.json',
    async fetchMenu(){
        
        const resApi = await fetch(this.url);
        return await resApi.json();
    }
}

export default API;