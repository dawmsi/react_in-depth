import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  debounce,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useMemo, useState } from 'react';
import { KeywordItem, client } from '../../api/tmdb';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/useAppRedux';

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}

export default function MoviesFilter({ onApply }: MoviesFilterProps) {
  const { control, handleSubmit, formState } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);
  const [keywordsLoading, setKeywordsLoading] = useState(false);

  const genres = useAppSelector((state) => state.movies.genres);

  const fetchKeywordOptions = async (query: string) => {
    if (query) {
      setKeywordsLoading(true);

      const options = await client.getKeywords(query);

      setKeywordsLoading(false);
      setKeywordsOptions(options);
    } else {
      setKeywordsOptions([]);
    }
  };

  const debounceFetchKeywords = useMemo(
    () => debounce(fetchKeywordOptions, 1000),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl
          sx={{ m: 2, display: 'block' }}
          component="fieldset"
          variant="standard">
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                loading={keywordsLoading}
                disablePortal
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onChange(value)}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(_, value) => debounceFetchKeywords(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Keywords" />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{ m: 2, display: 'block' }}
          component="fieldset"
          variant="standard">
          <FormLabel component="legend">Genres</FormLabel>
          <FormGroup sx={{ maxHeight: 500 }}>
            <Controller
              name="genres"
              control={control}
              render={({ field }) => (
                <>
                  {genres.map((genre) => (
                    <FormControlLabel
                      key={genre.id}
                      control={
                        <Checkbox
                          value={genre.id}
                          checked={field.value.includes(genre.id)}
                          onChange={(event, checked) => {
                            const valueNumber = Number(event.target.value);
                            if (checked) {
                              field.onChange([...field.value, valueNumber]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (value) => value !== valueNumber
                                )
                              );
                            }
                          }}
                        />
                      }
                      label={genre.name}
                    />
                  ))}
                </>
              )}
            />
          </FormGroup>
        </FormControl>
        <Button
          type="submit"
          sx={{ m: 2 }}
          variant="contained"
          startIcon={<FilterAltOutlinedIcon />}
          disabled={!formState.isDirty}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
}
