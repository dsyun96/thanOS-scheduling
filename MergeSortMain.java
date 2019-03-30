import java.util.*;

public class MergeSortMain {

    static int[] s1 = null;
    static int[] s2 = null;
    static int num;
    static int[] tempArray = null; //additional array for inPlaceMergeSort

    public static void main(String[] args) {
        num = 10;

        Random r = new Random(System.currentTimeMillis());
        s1 = new int[num]; //Initialize the array s1
        s2 = new int[num]; //Initialize the array s2
        tempArray = new int[num]; //Initialize the additional array

        for (int i = 0; i < num; i++) {
            s1[i] = s2[i] = r.nextInt(num);
        }

        System.out.println("s1");
        for (int i = 0; i < num; i++) {
            System.out.print(s1[i] + " ");
        }
        System.out.println();

        System.out.println("s2");
        for (int i = 0; i < num; i++) {
            System.out.print(s2[i] + " ");
        }
        System.out.println();

        long startTime = 0, endTime = 0;
        int location = -1;

        startTime = System.nanoTime();
        mergeSort(num, s1);
        endTime = System.nanoTime();
        System.out.println("[MergeSort Result]");
        System.out.println("Elapsed Time: " + (endTime - startTime) + "nano sec.");
        System.out.println();


        startTime = System.nanoTime();
        inPlaceMergeSort(0, num - 1);
        endTime = System.nanoTime();
        System.out.println("[In-place MergeSort Result]");
        System.out.println("Elapsed Time: " + (endTime - startTime) + "nano sec.");
        System.out.println();

        System.out.println("[MergeSorted s1]");
        for (int i = 0; i < num; i++) {
            System.out.print(s1[i] + " ");
        }
        System.out.println();

        System.out.println("[In-place MergeSorted s2]");
        for (int i = 0; i < num; i++) {
            System.out.print(s2[i] + " ");
        }
        System.out.println();
    }

    public static void mergeSort(int n, int[] s) { //mergeSort [Algorithm 2.2]

        int h = n / 2;//n을 반으로 나눈값 h
        int m = n - h;//n을 반으로 나눈값 m
        int[] u = new int[h];//배열 s의 왼쪽부분을 담당할 배열 u
        int[] v = new int[m];//배열 s의 오른쪽부분을 담당할 배열 v

        if (n == 1) return;

        for (int i = 0; i < h; i++) {//
            u[i] = s[i];
        }
        for (int i = 0; i < n - h; i++) {
            v[i] = s[h+i];
        }

        mergeSort(h, u);
        mergeSort(m, v);

        merge(h, m, u, v, s);
    }


    public static void merge(int h, int m, int[] u, int[] v, int[] s) {
        int i = 0;
        int j = 0;
        int k = 0;

        while (i < h && j < m) {
            if (u[i] < v[j])
                s[k] = u[i++];
             else
                s[k] = v[j++];
            k++;
        }
            while (j < m)
                s[k++] = v[j++];

            while (i < h)
                s[k++] = u[i++];
    }

    public static void inPlaceMergeSort(int low, int high) {

        if(low == high) return;

        int mid = (low+high)/2;

        inPlaceMergeSort(low, mid);
        inPlaceMergeSort(mid+1, high);

        inPlaceMerge(low, mid, high);
    }

    public static void inPlaceMerge(int low, int mid, int high) {

        int i = low;
        int j = mid+1;
        int k = low;

        while(i <= mid && j <= high) {
            if(s2[i] < s2[j])
                tempArray[k] = s2[i++];
            else
                tempArray[k] = s2[j++];
            k++;
        }

        while (j <= high) {
            tempArray[k++] = s2[j++];
        }
        while (i <= mid) {
            tempArray[k++] = s2[i++];
        }

        for(int t = low ; t<=high ; t++){
            s2[t] = tempArray[t];
        }
    }
}