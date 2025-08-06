# Wskaźnik: NAJMNIEJ PRZESIADEK

## Opis wskaźnika
Wskaźnik "najmniej przesiadek" mierzy **średnią liczbę przesiadek** w wyszukanych trasach dla każdego regionu. Niższa wartość oznacza lepsze wyniki - większy udział tras bezpośrednich i mniej koniecznych przesiadek podczas podróży.

## Metodologia
- **Źródło danych**: Kolumna `number_of_transfers` z bazy danych tras
- **Metryka główna**: Średnia arytmetyczna liczby przesiadek na trasę
- **Filtrowanie**: Uwzględniono tylko regiony z minimum 1000 tras dla zapewnienia statystycznej wiarygodności
- **Dodatkowe metryki**: Procent tras bezpośrednich (bez przesiadek)

## Kluczowe wyniki

### Statystyki ogólne (304,581 tras):
- **Średnia liczba przesiadek**: 0.40
- **Mediana**: 0.0 (połowa tras to połączenia bezpośrednie)
- **Rozkład przesiadek**:
  - 0 przesiadek: 201,798 tras (66.3%) 📈
  - 1 przesiadka: 85,719 tras (28.1%)
  - 2 przesiadki: 15,446 tras (5.1%)
  - 3+ przesiadki: 1,618 tras (0.5%)

### 🥇 TOP 15 regionów z najmniejszą liczbą przesiadek:

| Pozycja | Region | Średnia przesiadki | Procent tras bezpośrednich | Liczba tras |
|---------|--------|-------------------|---------------------------|-------------|
| 1 | LONG_DISTANCE | 0.116 | 89.9% | 2,747 |
| 2 | GORZOW | 0.159 | 84.5% | 1,516 |
| 3 | JELENIA_GORA | 0.160 | 84.9% | 1,210 |
| 4 | ZIELONA_GORA | 0.199 | 80.6% | 3,316 |
| 5 | OLSZTYN | 0.226 | 78.1% | 3,082 |
| 6 | RADOM | 0.229 | 78.0% | 1,299 |
| 7 | CZESTOCHOWA | 0.238 | 76.7% | 1,128 |
| 8 | TORUN | 0.250 | 76.5% | 4,890 |
| 9 | RZESZOW | 0.263 | 74.6% | 3,014 |
| 10 | LUBLIN | 0.278 | 73.7% | 9,510 |

### 🚌 Analiza według typu transportu:
| Typ | Średnia przesiadki | Liczba tras |
|-----|-------------------|-------------|
| TRAIN | 0.041 | 13,251 |
| TROLLEY_BUS | 0.107 | 4,336 |
| TRAM | 0.194 | 78,019 |
| SUBWAY | 0.200 | 1,829 |
| BUS | 0.250 | 154,586 |

## Najważniejsze obserwacje

### ✅ Mocne strony:
1. **Dominacja tras bezpośrednich**: 66.3% wszystkich tras nie wymaga przesiadek
2. **Koleje jako lider**: TRAIN ma najniższą średnią (0.041 przesiadki)
3. **Małe miasta wygrywają**: Miasta średniej wielkości oferują prostsze sieci z mniejszą liczbą przesiadek
4. **Długodystansowe połączenia**: LONG_DISTANCE liderem z 89.9% tras bezpośrednich

### ⚠️ Obszary do poprawy:
1. **Autobusy wymagają najwęcej przesiadek**: 0.250 średnio
2. **Duże miasta**: Większe metropolie mają więcej przesiadek z powodu rozbudowanych sieci
3. **Rzadkie skrajne przypadki**: 0.5% tras wymaga 3+ przesiadek

### 🏆 Ranking dużych miast:
Spośród największych aglomeracji najlepiej wypada **Trójmiasto** (pozycja 14, 0.346 przesiadki), następnie **Wrocław** (pozycja 15, 0.355 przesiadki).

## Pliki wynikowe
- `podsumowanie_najmniej_przesiadek.csv` - Kompletny ranking regionów
- `ranking_regionow_przesiadki.csv` - Szczegółowe statystyki dla wszystkich regionów
- `analiza_przesiadek_wizualizacja.png` - Główne wykresy i wizualizacje
- `rozkad_przesiadek_szczegoly.png` - Dodatkowe analizy rozkładu

## Wnioski
Wskaźnik najmniej przesiadek pokazuje, że **polski transport publiczny charakteryzuje się wysokim udziałem połączeń bezpośrednich**. Miasta średniej wielkości oferują szczególnie efektywne sieci z małą liczbą przesiadek, podczas gdy koleje zapewniają najbardziej bezpośrednie połączenia. 