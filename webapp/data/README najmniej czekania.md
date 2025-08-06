# Analiza wskaźnika "najmniej czekania na odjazd"

## Opis wskaźnika

Wskaźnik "najmniej czekania na odjazd" przedstawia średni czas czekania na początek pierwszej trasy względem zadanego czasu wyszukiwania. Jest to miara efektywności planowania podróży - pokazuje, jak długo użytkownik musi czekać od momentu, w którym chce rozpocząć podróż, do rzeczywistego odjazdu pierwszego środka transportu.

### Definicja
**Czas czekania na odjazd** = czas rozpoczęcia podróży - zadany czas wyszukiwania

Wartość wyrażona w minutach, gdzie:
- 0 minut = możliwość natychmiastowego odjazdu
- Wyższe wartości = dłuższe oczekiwanie na pierwszy środek transportu

## Metodologia analizy

### 1. Założenia
Na podstawie doświadczeń z poprzednich wskaźników zastosowano następujące podejście:

- **Uwzględnienie wszystkich środków transportu** (w tym pociągów) - pełny obraz mobilności
- **Tylko dni robocze** (poniedziałek-piątek) - reprezentatywne dla codziennych dojazdów
- **Tylko godziny dzienne** (6:00-22:00) - wykluczenie nocnych połączeń z długimi czasami oczekiwania
- **Metoda MAD** do identyfikacji outlierów (threshold = 3.5)
- **Mediana jako główny wskaźnik** - bardziej odporna na outliers niż średnia

### 2. Proces przetwarzania danych

1. **Wczytanie danych**: 304,581 rekordów z pliku `jd_report_route_10.csv`
2. **Filtrowanie dni roboczych**: 302,281 rekordów (99.2%)
3. **Filtrowanie godzin dziennych**: 259,793 rekordów (85.9%)
4. **Usunięcie braków danych**: 255,785 rekordów do analizy

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
- **Średnia**: 7.91 min
- **Mediana**: 5.00 min
- **Odch. standardowe**: 13.26 min
- **Zakres**: 0.00 - 1,317.00 min

Duża różnica między średnią a medianą (2.91 min) wskazuje na prawostronnie skośny rozkład.

### 2. Ranking miast - TOP 10 (według mediany)

| Pozycja | Miasto | Mediana | Średnia | P10-P90 | Outliers | Liczba tras |
|---------|--------|---------|---------|---------|----------|-------------|
| 🥇 | **Wrocław** | **4.0 min** | 6.37 min | 0-13 min | 4.0% | 37,961 |
| 🥇 | **Kraków** | **4.0 min** | 6.67 min | 0-14 min | 5.3% | 41,027 |
| 🥉 | Bydgoszcz | 5.0 min | 8.22 min | 0-17 min | 4.3% | 7,171 |
| 4️⃣ | Warszawa | 5.0 min | 7.59 min | 0-15 min | 5.8% | 59,312 |
| 4️⃣ | Trójmiasto | 5.0 min | 7.86 min | 0-17 min | 3.9% | 20,338 |
| 4️⃣ | Poznań | 5.0 min | 7.59 min | 0-17 min | 4.8% | 28,878 |
| 4️⃣ | Szczecin | 5.0 min | 7.06 min | 0-15 min | 2.5% | 5,423 |
| 8️⃣ | Lublin | 6.0 min | 8.42 min | 0-17 min | 3.4% | 8,368 |
| 8️⃣ | Łódź | 6.0 min | 7.98 min | 0-16 min | 3.3% | 5,923 |
| 8️⃣ | Słupsk | 6.0 min | 10.19 min | 0-19 min | 6.7% | 522 |

### 3. Analiza według typów transportu

| Typ transportu | Mediana | Średnia | P10-P90 | Liczba tras | Charakterystyka |
|----------------|---------|---------|---------|-------------|-----------------|
| 🚇 **Metro** | **3.0 min** | 3.97 min | 1-9 min | 1,548 | Najkrótszy czas czekania |
| 🚊 **Tramwaj** | **4.0 min** | 4.65 min | 0-10 min | 66,868 | Bardzo dobra częstotliwość |
| 🚎 **Trolejbus** | 5.0 min | 5.74 min | 0-13 min | 3,802 | Dobra częstotliwość |
| 🔄 **Multi-modal** | 5.0 min | 8.10 min | 0-17 min | 43,107 | Złożone trasy |
| 🚌 **Autobus** | 6.0 min | 9.21 min | 0-20 min | 129,790 | Najliczniejszy, dłuższe czekanie |
| 🚂 **Pociąg** | 8.0 min | 13.04 min | 1-29 min | 10,669 | Najdłuższy czas czekania |

### 4. Porównanie największych miast

| Miasto | Mediana | Średnia | Różnica śr-med | P90 | Outliers |
|--------|---------|---------|----------------|-----|----------|
| **Wrocław** | 4.0 min | 6.37 min | 2.37 min | 13.0 min | 4.0% |
| **Kraków** | 4.0 min | 6.67 min | 2.67 min | 14.0 min | 5.3% |
| **Warszawa** | 5.0 min | 7.59 min | 2.59 min | 15.0 min | 5.8% |
| **Trójmiasto** | 5.0 min | 7.86 min | 2.86 min | 17.0 min | 3.9% |
| **Poznań** | 5.0 min | 7.59 min | 2.59 min | 17.0 min | 4.8% |
| **Łódź** | 6.0 min | 7.98 min | 1.98 min | 16.0 min | 3.3% |
| **GOP** | 6.0 min | 9.52 min | **3.52 min** | 22.0 min | 4.1% |

## Kluczowe wnioski

### 1. Liderzy efektywności
- **Wrocław i Kraków** - najkrótszy czas czekania (mediana 4 min)
- **Metro** - najefektywniejszy środek transportu (mediana 3 min)
- **Transport szynowy** (metro, tramwaje) - znacznie lepsza częstotliwość niż autobusy

### 2. Charakterystyka czasu czekania
- **50% podróży** rozpoczyna się w ciągu 5 minut od planowanego czasu
- **90% podróży** rozpoczyna się w ciągu 15-20 minut
- **Średnio 4-5% połączeń** to outliers z bardzo długimi czasami czekania

### 3. Różnice regionalne
- **GOP** - największa zmienność (różnica średnia-mediana: 3.52 min)
- **Szczecin** - najmniej outlierów (2.5%)
- **Warszawa** - najwięcej outlierów (5.8%) mimo dobrej mediany

### 4. Transport kolejowy
- **Najdłuższe czasy czekania** (mediana 8 min, średnia 13 min)
- **Duża zmienność** (P90 = 29 min)
- Wynika z rzadszych kursów i sztywnych rozkładów jazdy

## Implikacje praktyczne

### Dla użytkowników:
1. **Planowanie z wyprzedzeniem** - szczególnie dla pociągów i autobusów
2. **Wybór transportu szynowego** w miastach - krótsze czasy czekania
3. **Uwzględnienie buforu czasowego** - 10-15 minut w godzinach szczytu

### Dla miast:
1. **Inwestycje w transport szynowy** - metro i tramwaje mają najlepszą częstotliwość
2. **Synchronizacja rozkładów** - redukcja czasów przesiadek w trasach multi-modalnych
3. **Zwiększenie częstotliwości autobusów** - obecnie najdłuższe czasy czekania

### Dla operatorów:
1. **Optymalizacja częstotliwości** w godzinach szczytu
2. **Dynamiczne dostosowanie rozkładów** do popytu
3. **Lepsza koordynacja** między różnymi środkami transportu

## Ograniczenia analizy

1. **Dane historyczne** - rzeczywiste czasy mogą się różnić
2. **Fokus na dniach roboczych** - weekendy mogą mieć inne charakterystyki
3. **Brak kontekstu lokalizacji** - czasy mogą się różnić w centrum vs peryferia
4. **Agregacja regionalna** - ukrywa różnice wewnątrz miast

## Rekomendacje

### Krótkoterminowe:
1. **Monitorowanie outlierów** - identyfikacja problematycznych połączeń
2. **Analiza godzinowa** - optymalizacja w szczytach komunikacyjnych
3. **Benchmarking** - uczenie się od liderów (Wrocław, Kraków)

### Długoterminowe:
1. **Rozwój transportu szynowego** - inwestycje w metro i tramwaje
2. **Integracja systemów** - wspólne planowanie różnych środków transportu
3. **Smart city** - dynamiczne zarządzanie transportem w czasie rzeczywistym

## Pliki wygenerowane

### 📊 Wyniki analizy:
- `sredni_czas_czekania_na_odjazd.csv` - pełne wyniki analizy dla wszystkich regionów

### 🔧 Skrypty:
- `analyze_wait_time_for_departure.py` - skrypt przeprowadzający analizę
- `create_visualizations.py` - skrypt generujący wizualizacje

### 📈 Wizualizacje:
- `ranking_miast_najmniej_czekania.png` - TOP 10 miast z najkrótszym czasem czekania
- `analiza_transportu_najmniej_czekania.png` - porównanie typów transportu
- `porownanie_duzych_miast_najmniej_czekania.png` - analiza największych miast
- `analiza_rozkladu_najmniej_czekania.png` - rozkłady statystyczne
- `infografika_najmniej_czekania.png` - podsumowanie kluczowych wyników

### 📚 Dokumentacja:
- `README.md` - niniejsza dokumentacja

## Porównanie z innymi wskaźnikami

- **"Najczęściej"** - częstotliwość kursowania (co ile minut)
- **"Najmniej czekania"** - czas do pierwszego odjazdu (jak długo czekać)

Oba wskaźniki są komplementarne - częstotliwość pokazuje regularność, a czas czekania rzeczywiste doświadczenie użytkownika przy planowaniu podróży.

---

**Data analizy**: Styczeń 2025  
**Metodyka**: Mediana czasu oczekiwania na odjazd  
**Okres danych**: Dni robocze, godziny 6:00-22:00  
**Liczba tras**: 255,785 