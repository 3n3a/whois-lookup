//@ts-ignore
import dayjs from 'dayjs'
import 'dayjs/locale/de-ch'
dayjs.locale('de-ch')
//@ts-ignore
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export const Config = {
    timeFormat: 'HH:mm',
    dayjs: dayjs
}