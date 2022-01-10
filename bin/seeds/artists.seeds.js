require('dotenv').config();
require('./../../db/index')

const Artist = require('./../../models/artists.model')

const artists = [{
    name: 'Sonic Youth',
    isBand: true,
    description: 'A noisy band',
    image: ' '
}
]

async function createArtist() {
    try {
        await Artist.deleteMany()
        const createdArtist = await Artist.create(artists)
        console.log(`Just created ${createdArtist.length} artists`)
        process.exit()
    }
    catch (e) {
        console.error('Artists not created')
    }

}
createArtist()

