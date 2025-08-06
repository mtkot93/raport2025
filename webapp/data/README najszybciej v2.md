# Analiza Średniej Prędkości Pojazdów Transportu Publicznego - Wersja 2 (bez pociągów)

## Opis wskaźnika

Wskaźnik "najszybciej v2" przedstawia średnią prędkość pojazdów transportu publicznego **z wykluczeniem pociągów**, obliczoną jako:

**Średnia prędkość ważona = Σ(długość tras w km) / Σ(czas przejazdu w godzinach)**

Jest to prędkość rzeczywista uwzględniająca całkowitą odległość i czas wszystkich przejazdów miejskiego transportu publicznego.

## Kluczowe różnice względem wersji 1

### GŁÓWNA RÓŻNICA: Wykluczenie pociągów
- **Wersja 1**: Analiza wszystkich środków transportu (304,581 rekordów)
- **Wersja 2**: Analiza bez pociągów (248,796 rekordów po filtrach)
- **Wykluczono**: 13,251 rekordów typu TRAIN

### Cel analizy v2
Celem jest analiza prędkości **czystego transportu miejskiego** bez wpływu szybkich połączeń kolejowych, które mogą zniekształcać obraz rzeczywistej mobilności miejskiej.

## Metodyka analizy

### 1. Proces filtrowania danych

1. **Wykluczenie pociągów** (TRAIN) - 13,251 rekordów
2. **Filtrowanie dni roboczych** (pon-pt) - pozostało 289,221 rekordów
3. **Filtrowanie godzin dziennych** (6:00-22:00) - pozostało 248,964 rekordów
4. **Usunięcie braków danych** - transport_length_meters, transport_time_minutes
5. **Filtrowanie wartości > 0** - pozostało 248,885 rekordów
6. **Filtrowanie prędkości <= 120 km/h** - pozostało 248,796 rekordów

### 2. Zastosowane filtry

- **Tylko dni robocze** (poniedziałek-piątek)
- **Tylko godziny dzienne** (6:00-22:00)
- **Podział na miasta/regiony**
- **Wykluczenie pociągów** - kluczowa różnica v2
- **Zastosowanie metody MAD** do identyfikacji outlierów

## Wyniki analizy v2

### TOP 10 miast według liczby rekordów (bez pociągów):
1. **WARSZAWA** - 55,267 rekordów (avg: 27.85 km/h)
2. **KRAKOW** - 41,192 rekordów (avg: 24.24 km/h)
3. **WROCLAW** - 38,301 rekordów (avg: 19.82 km/h)
4. **POZNAN** - 29,066 rekordów (avg: 24.44 km/h)
5. **TROJMIASTO** - 18,317 rekordów (avg: 24.94 km/h)

### Ranking najszybszych miast (bez pociągów):
1. **LONG_DISTANCE** - 39.90 km/h (26 rekordów)
2. **GOP** - 28.22 km/h (13,639 rekordów)
3. **WARSZAWA** - 27.85 km/h (55,267 rekordów)
4. **RYBNIK** - 27.83 km/h (448 rekordów)
5. **KOLOBRZEG** - 26.88 km/h (116 rekordów)

### Analiza według typów transportu (bez pociągów):
1. **SUBWAY** - 44.42 km/h (1,564 rekordów) - najszybszy
2. **BUS** - 25.92 km/h (131,284 rekordów) - dominujący
3. **TROLLEY_BUS** - 22.35 km/h (3,839 rekordów)
4. **TRAM** - 21.71 km/h (67,846 rekordów)
5. **WATER_TRAM** - 0.77 km/h (1 rekord)

## Kluczowe wnioski z analizy v2

### 1. Wpływ wykluczenia pociągów
- **GOP** awansował na 2. miejsce (z 6. w v1)
- **WARSZAWA** spadła z 1. na 3. miejsce w rankingu prędkości
- Metro pozostaje najszybszym środkiem transportu miejskiego

### 2. Nowy obraz transportu miejskiego
- **GOP** okazuje się mieć najszybszy transport miejski (28.22 km/h)
- **Autobusy** dominują liczbą rekordów (131,284 - 52.8% wszystkich)
- **Metro** zachowuje najwyższą prędkość (44.42 km/h) ale tylko w Warszawie

### 3. Stabilność rankingu
- Większość miast utrzymała podobne pozycje
- Różnice w prędkościach stały się bardziej wyrównane
- Mniejszy rozrzut wyników

## Znaczenie analizy v2

### Dlaczego warto wykluczyć pociągi?
1. **Czysty obraz transportu miejskiego** - bez szybkich połączeń podmiejskich
2. **Porównywalność miast** - podobne warunki urbanistyczne
3. **Fokus na mobilność miejską** - rzeczywiste doświadczenie mieszkańców
4. **Planowanie transportu** - optymalizacja sieci miejskiej

### Zastosowania praktyczne:
- Porównanie efektywności systemów transportu miejskiego
- Identyfikacja obszarów do poprawy infrastruktury
- Benchmarking między miastami
- Planowanie nowych inwestycji transportowych

## Rekomendacje na podstawie v2

1. **GOP** - model do naśladowania dla innych aglomeracji
2. **Metro** - inwestycja w podziemną kolej miejską znacząco zwiększa prędkość
3. **Autobusy** - potrzeba lepszej infrastruktury (pasy autobusowe, priorytet)
4. **Tramwaje** - modernizacja torowisk i sygnalizacji

## Porównanie v1 vs v2

| Aspekt | Wersja 1 (z pociągami) | Wersja 2 (bez pociągów) |
|--------|------------------------|--------------------------|
| Rekordy | 304,581 → 269,418 | 304,581 → 248,796 |
| Lider prędkości | TROJMIASTO (26.8 km/h) | GOP (28.22 km/h) |
| Warszawa | 1. miejsce (29.94 km/h) | 3. miejsce (27.85 km/h) |
| Najszybszy transport | TRAIN | SUBWAY |
| Fokus | Wszystkie środki | Transport miejski |

## Pliki wygenerowane

- `srednia_predkosc_pojazdu_v2.csv` - pełne wyniki analizy bez pociągów
- `analyze_speed_v2.py` - skrypt analizy v2
- `README.md` - niniejsza dokumentacja

## Uwagi techniczne

- Metodyka identyczna jak w v1, z wyjątkiem wykluczenia pociągów
- Wszystkie filtry czasowe i geograficzne zachowane
- Metoda MAD do identyfikacji outlierów bez zmian
- Prędkości obliczone na podstawie rzeczywistych tras i czasów 