export function dateFormat(date: string) {
    // 2024-08-06T17:01:55.790+00:00
    if (!date) return '';
    const date_arr = date.split("T");
    const date_yyyy_mm_dd = date_arr[0].split("-")
    const date_hh_mm_ss = date_arr[1].split(":")
    return `${date_yyyy_mm_dd[2]}-${date_yyyy_mm_dd[1]}-${date_yyyy_mm_dd[0]} at ${date_hh_mm_ss[0]}:${date_hh_mm_ss[1]}`
}