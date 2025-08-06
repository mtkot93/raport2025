# Analiza wskaźnika "najmniej czekania na odjazd" - godziny nocne (22:00-6:00)

## Opis wskaźnika

Wskaźnik "najmniej czekania na odjazd" przedstawia średni czas czekania na początek pierwszej trasy względem zadanego czasu wyszukiwania w godzinach nocnych. Jest to miara efektywności planowania podróży nocnych - pokazuje, jak długo użytkownik musi czekać od momentu, w którym chce rozpocząć podróż w nocy, do rzeczywistego odjazdu pierwszego środka transportu.

### Definicja
**Czas czekania na odjazd** = czas rozpoczęcia podróży - zadany czas wyszukiwania

Wartość wyrażona w minutach, gdzie:
- 0 minut = możliwość natychmiastowego odjazdu
- Wyższe wartości = dłuższe oczekiwanie na pierwszy środek transportu

## Metodologia analizy

### 1. Założenia
Na podstawie doświadczeń z poprzednich wskaźników zastosowano następujące podejście:

- **Uwzględnienie wszystkich środków transportu** (w tym pociągów) - pełny obraz mobilności nocnej
- **Tylko dni robocze** (poniedziałek-piątek) - reprezentatywne dla codziennych dojazdów
- **Tylko godziny nocne** (22:00-6:00) - analiza połączeń w czasie nocnym
- **Metoda MAD** do identyfikacji outlierów (threshold = 3.5)
- **Mediana jako główny wskaźnik** - bardziej odporna na outliers niż średnia

### 2. Proces przetwarzania danych

1. **Wczytanie danych**: 304,581 rekordów z pliku `jd_report_route_10.csv`
2. **Filtrowanie dni roboczych**: 302,281 rekordów (99.2%)
3. **Filtrowanie godzin nocnych**: 42,488 rekordów (14.1% dni roboczych)
4. **Usunięcie braków danych**: 41,216 rekordów do analizy

### 3. Kolumna analizowana
- `departure_wait_time_minutes` - czas oczekiwania na odjazd z pierwszego przystanku podróży

### 4. Statystyki obliczone
- **Średnia, mediana** - miary tendencji centralnej
- **Odchylenie standardowe** - miara rozproszenia
- **Percentyle** (P10, P25, P75, P90, P95) - rozkład wartości
- **Outliers (MAD)** - procent nietypowych wartości
- **Różnica średnia-mediana** - miara skośności rozkładu

## Kluczowe wyniki

### 1. Statystyki całościowe
- **Średnia**: 16.50 min
- **Mediana**: 5.00 min (identyczna jak w dzień!)
- **Odch. standardowe**: 58.19 min
- **Zakres**: 0.00 - 1,386.00 min

**Gigantyczna różnica między średnią a medianą** (11.50 min vs 2.91 min w dzień) wskazuje na ekstremalnie prawostronnie skośny rozkład w godzinach nocnych.

### 2. Ranking miast - TOP 10 (według mediany)

| Pozycja | Miasto | Mediana | Średnia | P10-P90 | Outliers | Liczba tras |
|---------|--------|---------|---------|---------|----------|-------------|
| 🥇 | **Warszawa** | **5.0 min** | 16.22 min | 0-19 min | 6.4% | 9,643 |
| 🥇 | **Poznań** | **5.0 min** | 16.80 min | 0-27 min | 10.4% | 5,226 |
| 🥇 | **Wrocław** | **5.0 min** | 10.34 min | 0-16 min | 5.0% | 6,626 |
| 🥇 | **Kraków** | **5.0 min** | 15.02 min | 0-21 min | 8.0% | 6,195 |
| 5️⃣ | Lublin | 6.0 min | 32.86 min | 0-99 min | 12.5% | 1,016 |
| 5️⃣ | Trójmiasto | 6.0 min | 16.71 min | 0-23 min | 8.0% | 3,474 |
| 5️⃣ | Toruń | 6.0 min | 18.24 min | 0-28 min | 10.7% | 560 |
| 5️⃣ | Szczecin | 6.0 min | 18.58 min | 0-21 min | 8.3% | 880 |
| 5️⃣ | GOP | 6.0 min | 16.08 min | 0-29 min | 8.8% | 2,219 |
| 1️⃣0️⃣ | Łódź | 7.0 min | 16.46 min | 1-23 min | 8.0% | 891 |

### 3. Analiza według typów transportu

| Typ transportu | Mediana | Średnia | P10-P90 | Liczba tras | Charakterystyka |
|----------------|---------|---------|---------|-------------|-----------------|
| 🚇 **Metro** | **3.0 min** | 9.75 min | 1-9 min | 139 | Najkrótszy czas czekania |
| 🚊 **Tramwaj** | **4.0 min** | 6.70 min | 0-10 min | 9,496 | Bardzo dobra częstotliwość |
| 🚎 **Trolejbus** | 5.0 min | 13.97 min | 0-16 min | 455 | Dobra częstotliwość |
| 🚌 **Autobus** | 6.0 min | 20.06 min | 0-30 min | 21,402 | Najliczniejszy, dłuższe czekanie |
| 🔄 **Multi-modal** | 6.0 min | 18.04 min | 0-20 min | 7,547 | Złożone trasy |
| 🚂 **Pociąg** | 8.0 min | 19.94 min | 1-39 min | 2,177 | Najdłuższy czas czekania |

### 4. Porównanie największych miast

| Miasto | Mediana | Średnia | Różnica śr-med | P90 | Outliers |
|--------|---------|---------|----------------|-----|----------|
| **Warszawa** | 5.0 min | 16.22 min | **11.22 min** | 19.0 min | 6.4% |
| **Poznań** | 5.0 min | 16.80 min | **11.80 min** | 27.0 min | 10.4% |
| **Wrocław** | 5.0 min | 10.34 min | 5.34 min | 16.0 min | 5.0% |
| **Kraków** | 5.0 min | 15.02 min | 10.02 min | 21.0 min | 8.0% |
| **Trójmiasto** | 6.0 min | 16.71 min | 10.71 min | 23.0 min | 8.0% |
| **GOP** | 6.0 min | 16.08 min | 10.08 min | 29.0 min | 8.8% |
| **Łódź** | 7.0 min | 16.46 min | 9.46 min | 23.0 min | 8.0% |

### 5. Miasta z ekstremalnymi problemami nocnymi

| Miasto | Mediana | Średnia | Różnica śr-med | P90 | Outliers |
|--------|---------|---------|----------------|-----|----------|
| **Konin** | 14.5 min | 116.77 min | **102.27 min** | 420.5 min | **28.6%** |
| **Leszno** | 21.0 min | 102.42 min | 81.42 min | 357.3 min | **26.3%** |
| **Kołobrzeg** | 19.5 min | 103.0 min | 83.5 min | 208.5 min | **25.0%** |
| **Stargard** | 11.0 min | 41.93 min | 30.93 min | 62.4 min | **22.2%** |
| **Rybnik** | 6.0 min | 52.93 min | 46.93 min | 245.0 min | **21.3%** |

## Kluczowe wnioski

### 1. Porównanie z połączeniami dziennymi
- **Identyczna mediana**: 5.0 min (dzień i noc)
- **Dwukrotnie wyższa średnia**: 16.50 min vs 7.91 min w dzień
- **Znacznie wyższe odsetki outlierów**: 8-12% vs 4-5% w dzień
- **Ekstremalne wartości**: niektóre regiony mają ponad 25% outlierów

### 2. Liderzy efektywności nocnej
- **Warszawa, Poznań, Wrocław, Kraków** - najkrótszy czas czekania (mediana 5 min)
- **Metro** - najefektywniejszy środek transportu nocnego (mediana 3 min)
- **Transport szynowy** - zachowuje przewagę nad autobusami w nocy

### 3. Charakterystyka czasu czekania nocnego
- **50% podróży nocnych** rozpoczyna się w ciągu 5 minut (tak samo jak w dzień!)
- **90% podróży** rozpoczyna się w ciągu 16-29 minut (vs 15-20 minut w dzień)
- **Średnio 8-12% połączeń** to outliers z bardzo długimi czasami czekania

### 4. Problematyczne regiony nocne
- **Konin, Leszno, Kołobrzeg** - poważne problemy z dostępnością nocną
- **Większe miasta** radzą sobie lepiej z utrzymaniem częstotliwości nocnej
- **Małe regiony** często mają bardzo ograniczoną ofertę nocną

### 5. Transport kolejowy w nocy
- **Nadal najdłuższe czasy czekania** (mediana 8 min vs 8 min w dzień)
- **Podobna charakterystyka** jak w ciągu dnia
- **Mniejsza liczba połączeń**: 2,177 vs 10,669 w dzień

## Implikacje praktyczne

### Dla użytkowników:
1. **Planowanie z większym wyprzedzeniem** - szczególnie w mniejszych miastach
2. **Wybór większych ośrodków** - lepiej utrzymana częstotliwość nocna
3. **Uwzględnienie znacznie większego buforu czasowego** - 20-30 minut w godzinach nocnych
4. **Sprawdzanie dostępności** - niektóre regiony mają bardzo ograniczoną ofertę nocną

### Dla miast:
1. **Priorytet dla większych ośrodków** - utrzymanie podstawowej częstotliwości w nocy
2. **Transport szynowy** - nadal najlepsza opcja dla połączeń nocnych
3. **Koordinacja regionalna** - wspólne planowanie połączeń nocnych
4. **Alternatywy dla małych miast** - transport na żądanie, busy nocne

### Dla operatorów:
1. **Różne strategie dla nocy** - nie da się bezpośrednio przenieść rozwiązań dziennych
2. **Koncentracja na głównych trasach** - optymalizacja najważniejszych połączeń
3. **Elastyczne rozkłady** - dostosowanie do rzeczywistego popytu nocnego
4. **Monitorowanie ekstremów** - szczególna uwaga na regiony z wysokimi outlierami

## Porównanie dzień vs noc

### Podobieństwa:
- **Identyczna mediana** (5.0 min) - podstawowy czas czekania się nie zmienia
- **Ranking typów transportu** - metro i tramwaje nadal najlepsze
- **Hierarchia miast** - duże miasta nadal lepsze od małych

### Różnice:
- **Średnia dwukrotnie wyższa** (16.50 vs 7.91 min) - większa zmienność
- **Więcej outlierów** (8-12% vs 4-5%) - większa nieprzewidywalność
- **Ekstremalne regiony** - niektóre miasta mają poważne problemy nocne
- **Mniejsza liczba połączeń** (41,216 vs 255,785 rekordów)

## Rekomendacje

### Krótkoterminowe:
1. **Identyfikacja priorytetów** - które połączenia nocne są krytyczne
2. **Monitorowanie outlierów** - szczególnie w regionach z >20% outlierów
3. **Komunikacja z użytkownikami** - jasne informacje o ograniczeniach nocnych

### Długoterminowe:
1. **Strategie nocne** - oddzielne planowanie dla godzin nocnych
2. **Inwestycje selektywne** - koncentracja na głównych ośrodkach
3. **Innowacyjne rozwiązania** - transport na żądanie dla małych regionów
4. **Integracja systemów** - lepsze połączenia między regionami w nocy

## Pliki wygenerowane

### 📊 Wyniki analizy:
- `sredni_czas_czekania_na_odjazd_nocne.csv` - pełne wyniki analizy dla wszystkich regionów

### 🔧 Skrypty:
- `analyze_wait_time_for_departure_nocne.py` - skrypt przeprowadzający analizę nocną

### 📚 Dokumentacja:
- `README_najmniej_czekania_nocne.md` - niniejsza dokumentacja

## Porównanie z innymi wskaźnikami

- **"Najczęściej nocne"** - częstotliwość kursowania w nocy (co ile minut)
- **"Najmniej czekania nocne"** - czas do pierwszego odjazdu w nocy (jak długo czekać)

Oba wskaźniki nocne pokazują podobne wzorce - znacznie większą zmienność i problemy w mniejszych regionach w porównaniu z analizami dziennymi.

---

**Data analizy**: Grudzień 2024  
**Metodyka**: Mediana czasu oczekiwania na odjazd w godzinach nocnych  
**Okres danych**: Dni robocze, godziny 22:00-6:00  
**Liczba tras**: 41,216  
**Porównanie z dniem**: Identyczna mediana, dwukrotnie wyższa średnia