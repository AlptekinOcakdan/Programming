#include "stdio.h"

int main() {
    printf("            Carpim Tablosu\n");
    printf("************************************\n");
    printf("  |");
    for(int i=1; i<=10; i++) {
        printf("%4d", i);
    }
    printf("\n************************************\n");
    for(int i=1; i<=10; i++) {
        printf("%2d|", i);
        for(int j=1; j<=10; j++) {
            if(i*j<10) printf("%4d", i*j);
            else break;
        }
        printf("\n");
    }
    printf("************************************\n");
    return 0;
}