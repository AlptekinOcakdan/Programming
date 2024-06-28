package pkt;

import java.util.Scanner;

public class Program {
    public static void main(String[] args) {
        /*for (int i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                System.out.println(i);
            }
        }*/
        
        int sayi;
        Scanner scanner = new Scanner(System.in);
        /*System.out.print("Bir sayı giriniz: ");
        int []dizi = {1, 2, 3, 4, 5};
        sayi = scanner.nextInt();
        for(int i : dizi) {
            if (i == sayi) {
                System.out.println("Sayı dizide mevcut.");
                break;
            }
        }*/
        
        /*while(true) {
            System.out.println("Sonsuz döngü");
        }*/
        
        /*do {
            System.out.print("Bir sayı giriniz: ");
            sayi = scanner.nextInt();
        } while(!new String(new char[sayi]).matches(".?|(..+?)\\1+"));
        System.out.println("Sayı asal değil.");*/
        
        /*double toplamAgirlik = 0,agirlik;
        do {
            System.out.print("Agirlik giriniz: ");
            agirlik = scanner.nextDouble();
            if (agirlik<=0) continue;
            if (toplamAgirlik + agirlik > 100) break;
            toplamAgirlik += agirlik;
        } while(toplamAgirlik < 100);
        System.out.println("Toplam agirlik: " + toplamAgirlik);*/

        System.out.print("             Carpim Tablosu\n");
        System.out.print("----------------------------------------\n");
        System.out.print("  |");
        for (int i = 1; i <= 10; i++) {
            System.out.print("  "+ i);
        }
        System.out.print("\n----------------------------------------\n");
        for (int i = 1; i <= 10; i++) {
            System.out.print(i+ " | ");
            for (int j = 1; j <= 10; j++) {
                if (i*j<10)System.out.print(" " +i * j);
                else break;
            }
            System.out.println();
        }
        
    }
}
