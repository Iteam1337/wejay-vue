import {
  concatenate,
  duration,
  timeAgo,
  wejayTrack
} from '@/utils/helpers'

describe('helpers', () => {
  describe('#concatenate', () => {
    it('renders blank if no values are provided', () => {
      expect(concatenate()).to.eql('')
    })

    it('concatenates based on name', () => {
      const artists = [
        { name: 'First' },
        { name: 'Aid' },
        { name: 'Kit' }
      ]

      expect(concatenate(artists)).to.eql('First, Aid, Kit')
    })

    it('can concatenate with any separator', () => {
      const artists = [
        { name: 'Marina' },
        { name: 'and the' },
        { name: 'Diamonds' }
      ]

      expect(concatenate(artists, ' - ')).to.eql('Marina - and the - Diamonds')
    })

    it('can concatenate on any property', () => {
      const artists = [
        { title: 'The' },
        { title: 'Outsider' }
      ]

      expect(concatenate(artists, ' ', 'title')).to.eql('The Outsider')
    })
  })

  describe('#duration', () => {
    it('parses seconds', () => {
      expect(duration(10000)).to.eql('0:10')
    })

    it('parses minutes and seconds', () => {
      expect(duration(186000)).to.eql('3:06')
    })

    it('parses 60 seconds to 1 minutes', () => {
      expect(duration(60000)).to.eql('1:00')
    })

    it('parses 60 minutes to 1 hours', () => {
      expect(duration(3600000)).to.eql('1:00:00')
    })

    it('parses hours, minutes and seconds', () => {
      expect(duration(8971230)).to.eql('2:29:31')
    })
  })

  describe('#timeAgo', () => {
    it('sends back the time from now of a date', () => {
      expect(timeAgo('2017-03-11')).to.eql('3 days ago')
    })
  })

  describe('#wejayTrack', () => {
    it('returns a track object structured for the API', () => {
      const track = {
        album: 'album',
        artists: [{ name: '30 Secs' }],
        duration_ms: 1337,
        name: 'Attack',
        id: 1,
        uri: 'spotify:1337'
      }

      expect(wejayTrack(track)).to.eql({
        album: 'album',
        artists: [{ name: '30 Secs' }],
        duration: 1337,
        name: 'Attack',
        spotifyId: 1,
        uri: 'spotify:1337',
        started: null,
        position: null,
        user: null
      })
    })

    it('returns a track object structured for the API for fallback params', () => {
      const track = {
        album: 'album',
        artists: [{ name: '30 Secs' }],
        duration: 1337,
        name: 'Attack',
        spotifyId: 1,
        uri: 'spotify:1337'
      }

      expect(wejayTrack(track)).to.eql({
        album: 'album',
        artists: [{ name: '30 Secs' }],
        duration: 1337,
        name: 'Attack',
        spotifyId: 1,
        uri: 'spotify:1337',
        started: null,
        position: null,
        user: null
      })
    })
  })
})