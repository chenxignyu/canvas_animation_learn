/**
 * Created by chenxingyu on 2017/3/22.
 */
export default {
    indexOf(arr, obj) {
        let i = arr.length;
        while (i--){
            if (arr[i] === obj) {
                return i;
            }
        }
        return -1;
    }
}