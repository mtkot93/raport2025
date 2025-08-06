# Wskaźnik "Najmniej chodzenia"

## Opis wskaźnika

Wskaźnik **"najmniej chodzenia"** mierzy średnią długość odcinków pieszych w wyszukanych trasach komunikacji publicznej. Uwzględnia tylko trasy, w których całkowita długość chodzenia jest większa niż 0 metrów.

**Formuła:**
```
Całkowita długość chodzenia = transfers_walk_length_meters + edge_stops_walk_length_meters
Średnia długość chodzenia = suma(długość chodzenia) / liczba tras z chodzeniem > 0
```

## Kluczowe wyniki analizy

### Statystyki ogólne (304,581 rekordów)
- **Rekordy z chodzeniem > 0:** 239,508 (78.6%)
- **Wykluczonych rekordów:** 65,073 (21.4%)
- **Średnia długość chodzenia:** 553.3 metra
- **Mediana długość chodzenia:** 480.0 metrów
- **Minimalna długość:** 10 metrów
- **Maksymalna długość:** 7,760 metrów

## Ranking regionów (TOP 10 - najmniej chodzenia)

| Ranking | Region | Średnia długość [m] | Liczba tras | Interpretacja |
|---------|--------|-------------------|-------------|---------------|
| 1 | **GRUDZIADZ** | 456.3 | 253 | Najkrósze odcinki piesze |
| 2 | **OLSZTYN** | 463.3 | 1,794 | Bardzo dobry system |
| 3 | **JELENIA_GORA** | 464.6 | 824 | Kompaktowe miasto |
| 4 | **KONIN** | 477.4 | 366 | Efektywna sieć |
| 5 | **ZIELONA_GORA** | 490.7 | 1,988 | Dobrze zaplanowana |
| 6 | **GORZOW** | 492.4 | 1,000 | Sprawny transport |
| 7 | **WROCLAW** | 496.4 | 37,494 | Duże miasto - dobry wynik |
| 8 | **GNIEZNO** | 499.3 | 146 | Małe, efektywne |
| 9 | **SZCZECIN** | 506.8 | 4,930 | Solidny transport |
| 10 | **TORUN** | 510.6 | 3,258 | Dobra organizacja |

## Ranking regionów (BOTTOM 5 - najwięcej chodzenia)

| Ranking | Region | Średnia długość [m] | Liczba tras | Uwagi |
|---------|--------|-------------------|-------------|-------|
| 32 | **RZESZOW** | 662.8 | 2,622 | Wymaga poprawy |
| 33 | **TARNOW** | 668.9 | 199 | Długie odcinki piesze |
| 34 | **BIALYSTOK** | 710.6 | 2,705 | Problemy z dostępnością |
| 35 | **OSTROW** | 745.4 | 78 | Mała próbka |
| 36 | **KOLOBRZEG** | 785.7 | 117 | Najgorszy wynik |

## Analiza według typu transportu

| Ranking | Typ transportu | Średnia długość [m] | Liczba tras | Udział % |
|---------|---------------|-------------------|-------------|----------|
| 1 | **TRAM** | 509.9 | 60,563 | 25.3% |
| 2 | **TROLLEY_BUS** | 520.4 | 3,225 | 1.3% |
| 3 | **BUS** | 541.7 | 115,648 | 48.3% |
| 4 | **TRAIN** | 662.5 | 6,701 | 2.8% |
| 5 | **SUBWAY** | 729.7 | 1,651 | 0.7% |
| 6 | **WATER_TRAM** | 2,040.0 | 1 | <0.1% |

## Kluczowe spostrzeżenia

### 🏆 Najlepsze wyniki
- **Małe/średnie miasta dominują** w TOP 10 (Grudziądz, Olsztyn, Jelenia Góra)
- **Wrocław** jako jedyne duże miasto w TOP 10 (pozycja 7.)
- **Tramwaje** wymagają najmniej chodzenia (509.9m średnio)

### 📊 Duże miasta
- **Warszawa:** 27. miejsce (597.9m) - poniżej średniej, mimo wielkości
- **Kraków:** 14. miejsce (530.8m) - dobry wynik
- **Trójmiasto:** 22. miejsce (562.7m) - powyżej średniej
- **GOP:** 13. miejsce (521.5m) - bardzo dobry wynik

### 🚌 Transport publiczny
- **Tramwaje i trolejbusy** najefektywniejsze (krótkie odcinki piesze)
- **Autobusy** w środku rankingu (dominują próbkę - 48.3%)
- **Koleje i metro** wymagają więcej chodzenia (dłuższe dojścia)

### ⚠️ Problematyczne regiony
- **Kołobrzeg, Ostrów, Białystok** - ponad 700m średnio
- **Wschód Polski** gorzej oceniony (Białystok, Rzeszów, Tarnów)

## Metodologia

### Dane wejściowe
- **Źródło:** `jd_report_route_10.csv` (304,581 rekordów)
- **Kolumny:** `transfers_walk_length_meters`, `edge_stops_walk_length_meters`

### Proces analizy
1. Obliczenie całkowitej długości chodzenia (przesiadki + dojścia)
2. Filtracja rekordów z chodzeniem > 0 metrów
3. Agregacja według regionów i typów transportu
4. Ranking według średniej długości chodzenia (rosnąco)

### Ograniczenia
- 21.4% rekordów nie zawiera danych o chodzeniu
- Różna reprezentacja regionów (od 19 do 61,179 tras)
- Brak normalizacji względem wielkości miast

## Wnioski i rekomendacje

### 🎯 Najlepsze praktyki
1. **Tramwaje** - inwestycje w transport szynowy redukują chodzenie
2. **Kompaktowość** - mniejsze miasta często lepsze od wielkich aglomeracji
3. **Gęsta sieć przystanków** - kluczowa dla ograniczenia chodzenia

### 🔧 Obszary poprawy
1. **Regiony wschodnio-południowe** - wymagają poprawy dostępności
2. **Metro i koleje** - lepsza integracja z transportem lokalnym
3. **Planowanie przestrzenne** - bliższe przystanki do celów podróży

---

**Data analizy:** 2025-07-25  
**Pliki wynikowe:**
- `srednia_dlugosc_chodzenia_regiony.csv` - ranking regionów
- `srednia_dlugosc_chodzenia_transport.csv` - ranking transportu
- `podsumowanie_najmniej_chodzenia.csv` - statystyki ogólne 