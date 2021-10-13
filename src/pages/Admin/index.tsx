import Header from "../../components/Header";
import Button from "../../components/Button";
import InputText from "../../components/InputText";
import {
  Container,
  Box,
  CheckboxStyled,
  SelectStyled,
  FormStyled,
  FormMod,
  Wrapper,
  TextArea,
} from "./styles";
import { InputTypes } from "../../model/enums/input-types";
import { Select } from "antd";
import SchemaUtils from "../../shared/util/schema-utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import animes from "../../mock/animes.json";
import { useState } from "react";
import { FormAnime, FormEpisode, FormModerator } from "../../model/admin-forms";
import { SelectValue } from "antd/lib/select";
import { toast } from "react-hot-toast";
import InputFile from "../../components/InputFile";

const Admin = () => {
  const [genres, setGenres] = useState<SelectValue>([]);
  const [isDubbed, setIsDubbed] = useState(false);
  const [isMovie, setIsMovie] = useState(false);
  const [anime, setAnime] = useState<SelectValue>("");

  const inputModerator = [
    {
      name: "email",
      placeholder: "exemplo@mail.com",
      label: "Email*",
      type: InputTypes.EMAIL,
    },
  ];
  const inputEpisode = [
    {
      name: "episodeNumber",
      placeholder: "1",
      label: "Número*",
      type: InputTypes.TEXT,
    },
    {
      name: "videoUrl",
      placeholder: "https://streamable.com/z8xs0a",
      label: "Vídeo url*",
      type: InputTypes.TEXT,
    },
  ];

  const methodsAnime = useForm({
    resolver: yupResolver(SchemaUtils.anime()),
    mode: "all",
  });

  const methodsEpisode = useForm({
    resolver: yupResolver(SchemaUtils.episode()),
    mode: "all",
  });

  const methodsModerator = useForm({
    resolver: yupResolver(SchemaUtils.moderator()),
    mode: "all",
  });

  const onSubmitAnime = (data: FormAnime) => {
    console.log(data);
    if (!genres) {
      return toast.error("- Selecione pelo menos um gênero");
    }
    const output = {
      name: data.name,
      synopsis: data.synopsis,
      totalEpisodes: data.totalEpisodes,
      isDubbed: isDubbed,
      isMovie: isMovie,
      genres: genres,
      image: data.image[0],
    };
    console.log(output);
  };

  const onSubmitEpisode = (data: FormEpisode) => {
    console.log(data);

    if (!anime) {
      return toast.error("- Selecione um anime");
    }

    const output = {
      anime: anime,
      episodeNumber: data.episodeNumber,
      videoUrl: data.videoUrl,
      image: data.image,
    };
    console.log(output);
  };

  const onSubmitModerator = (data: FormModerator) => {
    console.log(data);
    const output = {
      email: data.email,
    };
    console.log(output);
  };

  const { Option } = Select;

  const teste = ["Shoujo", "Shounen", "Aventura", "Ação"].sort();

  return (
    <>
      <Header />
      <Container>
        <Box>
          <h2>Adicionar anime:</h2>
          <FormProvider {...methodsAnime}>
            <FormStyled
              onSubmit={methodsAnime.handleSubmit(onSubmitAnime)}
              autoComplete="off"
            >
              <InputText
                name="name"
                placeholder="Nome do anime"
                label="Nome do anime*"
                type={InputTypes.TEXT}
              />
              <TextArea>
                <label htmlFor="synopsis">Sinopse*</label>
                <textarea
                  name="synopsis"
                  id="synopsis"
                  cols={30}
                  rows={6}
                  placeholder=" Uma sinopse bem legal..."
                />
              </TextArea>
              <CheckboxStyled
                name="isMovie"
                onChange={(e) => setIsMovie(e.target.checked)}
              >
                Filme
              </CheckboxStyled>
              <InputText
                name="totalEpisodes"
                placeholder="12"
                label="Total de episódios*"
                type={InputTypes.TEXT}
                disabled={isMovie}
                maxWidth="120px"
              />
              <CheckboxStyled
                name="isDubbed"
                onChange={(e) => setIsDubbed(e.target.checked)}
              >
                Dublado
              </CheckboxStyled>
              <SelectStyled
                placeholder="Selecione os gêneros"
                mode="multiple"
                onChange={(e) => setGenres(e)}
              >
                {teste.map((genre, index) => (
                  <Option
                    name={genre}
                    value={genre}
                    key={`${genre}-category-${index}`}
                  >
                    {genre}
                  </Option>
                ))}
              </SelectStyled>
              <Wrapper>
                <InputFile name="image" />
                <Button text="Enviar" />
              </Wrapper>
            </FormStyled>
          </FormProvider>
        </Box>
        <Box>
          <h2>Adicionar episódio:</h2>
          <FormProvider {...methodsEpisode}>
            <FormStyled
              onSubmit={methodsEpisode.handleSubmit(onSubmitEpisode)}
              autoComplete="off"
            >
              <SelectStyled
                placeholder="Selecione o anime"
                onChange={(e) => setAnime(e)}
              >
                {animes.map((anime, index) => (
                  <Option
                    name={anime.name}
                    value={anime.name}
                    key={`${anime.name}-anime-${index}`}
                  >
                    {anime.name}
                  </Option>
                ))}
              </SelectStyled>
              {inputEpisode.map((input, index) => (
                <InputText
                  key={`${input.name}-episode-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input.type ?? ""}
                  maxWidth={index === 0 ? "120px" : "initial"}
                />
              ))}
              <Wrapper>
                <InputFile name="image" />
                <Button text="Enviar" />
              </Wrapper>
            </FormStyled>
          </FormProvider>
        </Box>
        <Box>
          <h2>Adicionar moderador:</h2>
          <FormProvider {...methodsModerator}>
            <FormMod
              onSubmit={methodsModerator.handleSubmit(onSubmitModerator)}
              autoComplete="off"
            >
              {inputModerator.map((input, index) => (
                <InputText
                  key={`${input.name}-moderator-${index}`}
                  name={input.name}
                  placeholder={input.placeholder}
                  label={input.label}
                  type={input?.type ?? ""}
                />
              ))}
              <Button text="Enviar" margin="0.5rem 0 0.5rem 8px" />
            </FormMod>
          </FormProvider>
        </Box>
        <Button text="Ver moderadores" />
      </Container>
    </>
  );
};

export default Admin;
