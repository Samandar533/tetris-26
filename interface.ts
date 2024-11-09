
const laptop: Laptop = {
    screen: {
        resolution: {
            width: 4096,
            height: 2156,
            fps: 120
        },
        brightness: 1200,
        manufacturer: 'Samsung'
    },
    cpu: {
        cores: 8,
        manufacturer: 'Intel'
    },
    ram: {
        memory: 16  
    },
    gpu: {
        memory: 6
    }
};
        interface Laptop {  
            screen: {
                resolution: {
                    width: number,
                    height: number,
                    fps: number
                },
                brightness: number,
                manufacturer: string
            },
            cpu: {
                cores: number,
                manufacturer: string
            },
            ram: {
                memory: number
            },
            gpu: {
                memory: number
            }
        }
