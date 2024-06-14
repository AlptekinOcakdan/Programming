#include "stdio.h"

int main()
{
int sayi;
    do{
        printf("4 Basamaklı Sayi:");
        scanf("%d", &sayi);
    }while(sayi<1000 || sayi>9999);
    
    short birler,onlar, yuzler, binler;
    binler = sayi / 1000;
    yuzler = (sayi % 1000) / 100;
    onlar = (sayi % 100) / 10;
    birler = sayi % 10;
    
    printf("\nBinler Basamağı: %d\n", binler);
    printf("Yüzler Basamağı: %d\n", yuzler);
    printf("Onlar Basamağı: %d\n", onlar);
    printf("Birler Basamağı: %d\n", birler);
    
    getchar();
    
    return 0;
}