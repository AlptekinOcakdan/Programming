#include "stdio.h"

int main() {
    int sayi, toplam=0;
    printf("Bir sayi giriniz: ");
    scanf("%d", &sayi);
    while(sayi != 0) {
        toplam += sayi;
        sayi--;
    }
    
    printf("Toplam: %d\n", toplam);
    return 0;
}