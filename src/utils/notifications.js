import Notify from 'notifyjs'
import { concatenate } from './filters'

export default function notification (song) {
  const artists = concatenate(song.artists)

  const notif = new Notify(artists, {
    body: song.name,
    closeOnClick: true,
    icon: '/static/wejay-logo-v2.png',
    notifyClick: () => window.location.href = 'http://www.wejay.org/room/iteam',
    timeout: 3
  })

  if (!Notify.needsPermission) {
    notif.show()
  } else if (Notify.isSupported() && Notify.permission !== 'denied') {
    Notify.requestPermission(
      () => notif.show(),
      () => console.log('User rejected Notifications')
    )
  }
}
