<template>
  <div
    class="min-h-screen bg-gradient-to-b from-yellow-400 to-green-500 flex items-center justify-center"
  >
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div v-if="!isRegistering">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Loginn
        </h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              v-model="loginForm.email"
              type="email"
              placeholder="seu@email.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Senha</label
            >
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {{ loading ? "Entrando..." : "Entrar" }}
          </button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">
          Não tem uma conta?
          <a
            href="#"
            @click.prevent="isRegistering = true"
            class="text-green-600 hover:text-green-700 font-medium"
            >Criar contaa</a
          >
        </p>
      </div>

      <div v-else>
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Criar Contaa
        </h2>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Nome</label
            >
            <input
              v-model="registerForm.name"
              type="text"
              placeholder="Seu nome completo"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Data de Nascimento</label
            >
            <input
              v-model="registerForm.birthDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Nacionalidade</label
            >
            <select
              v-model="registerForm.nationality"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Selecione um país</option>
              <option value="BR">Brasil</option>
              <option value="AF">Afeganistão</option>
              <option value="AL">Albânia</option>
              <option value="DE">Alemanha</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AI">Anguilla</option>
              <option value="AQ">Antártida</option>
              <option value="AG">Antígua e Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armênia</option>
              <option value="AW">Aruba</option>
              <option value="AU">Austrália</option>
              <option value="AT">Áustria</option>
              <option value="AZ">Azerbaijão</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrein</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Bélgica</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BM">Bermudas</option>
              <option value="BO">Bolívia</option>
              <option value="BA">Bósnia e Herzegovina</option>
              <option value="BW">Botsuana</option>
              <option value="BN">Brunei</option>
              <option value="BG">Bulgária</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="BT">Butão</option>
              <option value="CV">Cabo Verde</option>
              <option value="CM">Camarões</option>
              <option value="KH">Camboja</option>
              <option value="CA">Canadá</option>
              <option value="TD">Chade</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CY">Chipre</option>
              <option value="CO">Colômbia</option>
              <option value="KM">Comores</option>
              <option value="CG">Congo</option>
              <option value="KR">Coreia do Sul</option>
              <option value="KP">Coreia do Norte</option>
              <option value="CR">Costa Rica</option>
              <option value="CI">Costa do Marfim</option>
              <option value="HR">Croácia</option>
              <option value="CU">Cuba</option>
              <option value="DK">Dinamarca</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="EC">Equador</option>
              <option value="EG">Egito</option>
              <option value="SV">El Salvador</option>
              <option value="AE">Emirados Árabes Unidos</option>
              <option value="ER">Eritreia</option>
              <option value="SK">Eslováquia</option>
              <option value="SI">Eslovênia</option>
              <option value="ES">Espanha</option>
              <option value="SZ">Essuatíni</option>
              <option value="EE">Estônia</option>
              <option value="ET">Etiópia</option>
              <option value="FJ">Fiji</option>
              <option value="PH">Filipinas</option>
              <option value="FI">Finlândia</option>
              <option value="FR">França</option>
              <option value="GA">Gabão</option>
              <option value="GM">Gâmbia</option>
              <option value="GH">Gana</option>
              <option value="GE">Geórgia</option>
              <option value="GI">Gibraltar</option>
              <option value="GR">Grécia</option>
              <option value="GD">Granada</option>
              <option value="GL">Groenlândia</option>
              <option value="GP">Guadalupe</option>
              <option value="GU">Guam</option>
              <option value="GT">Guatemala</option>
              <option value="GY">Guiana</option>
              <option value="GF">Guiana Francesa</option>
              <option value="GN">Guiné</option>
              <option value="GW">Guiné-Bissau</option>
              <option value="GQ">Guiné Equatorial</option>
              <option value="HT">Haiti</option>
              <option value="HN">Honduras</option>
              <option value="HK">Hong Kong</option>
              <option value="HU">Hungria</option>
              <option value="YE">Iêmen</option>
              <option value="BV">Ilha Bouvet</option>
              <option value="CX">Ilha Christmas</option>
              <option value="IM">Ilha de Man</option>
              <option value="NF">Ilha Norfolk</option>
              <option value="KY">Ilhas Cayman</option>
              <option value="CC">Ilhas Cocos</option>
              <option value="CK">Ilhas Cook</option>
              <option value="UM">Ilhas Distantes Menores dos EUA</option>
              <option value="FO">Ilhas Faroe</option>
              <option value="HM">Ilhas Heard e McDonald</option>
              <option value="FK">Ilhas Malvinas</option>
              <option value="MP">Ilhas Marianas do Norte</option>
              <option value="MH">Ilhas Marshall</option>
              <option value="PN">Ilhas Pitcairn</option>
              <option value="SB">Ilhas Salomão</option>
              <option value="TC">Ilhas Turks e Caicos</option>
              <option value="VG">Ilhas Virgens Britânicas</option>
              <option value="VI">Ilhas Virgens dos EUA</option>
              <option value="IN">Índia</option>
              <option value="ID">Indonésia</option>
              <option value="IR">Irã</option>
              <option value="IQ">Iraque</option>
              <option value="IE">Irlanda</option>
              <option value="IS">Islândia</option>
              <option value="IL">Israel</option>
              <option value="IT">Itália</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japão</option>
              <option value="JO">Jordânia</option>
              <option value="KZ">Cazaquistão</option>
              <option value="KE">Quênia</option>
              <option value="KI">Kiribati</option>
              <option value="KW">Kuwait</option>
              <option value="LA">Laos</option>
              <option value="LV">Letônia</option>
              <option value="LB">Líbano</option>
              <option value="LS">Lesoto</option>
              <option value="LR">Libéria</option>
              <option value="LY">Líbia</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lituânia</option>
              <option value="LU">Luxemburgo</option>
              <option value="MO">Macau</option>
              <option value="MK">Macedônia do Norte</option>
              <option value="MG">Madagascar</option>
              <option value="MW">Maláui</option>
              <option value="MY">Malásia</option>
              <option value="MV">Maldivas</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MA">Marrocos</option>
              <option value="MQ">Martinica</option>
              <option value="MU">Maurício</option>
              <option value="MR">Mauritânia</option>
              <option value="YT">Mayotte</option>
              <option value="MX">México</option>
              <option value="FM">Micronésia</option>
              <option value="MD">Moldávia</option>
              <option value="MC">Mônaco</option>
              <option value="MN">Mongólia</option>
              <option value="ME">Montenegro</option>
              <option value="MS">Montserrat</option>
              <option value="MZ">Moçambique</option>
              <option value="MM">Mianmar</option>
              <option value="NA">Namíbia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="AN">Antilhas Holandesas</option>
              <option value="NI">Nicarágua</option>
              <option value="NE">Níger</option>
              <option value="NG">Nigéria</option>
              <option value="NU">Niue</option>
              <option value="NO">Noruega</option>
              <option value="NC">Nova Caledônia</option>
              <option value="NZ">Nova Zelândia</option>
              <option value="OM">Omã</option>
              <option value="NL">Países Baixos</option>
              <option value="PW">Palau</option>
              <option value="PS">Palestina</option>
              <option value="PA">Panamá</option>
              <option value="PG">Papua Nova Guiné</option>
              <option value="PK">Paquistão</option>
              <option value="PY">Paraguai</option>
              <option value="PE">Peru</option>
              <option value="PL">Polônia</option>
              <option value="PF">Polinésia Francesa</option>
              <option value="PT">Portugal</option>
              <option value="PR">Porto Rico</option>
              <option value="QA">Catar</option>
              <option value="GB">Reino Unido</option>
              <option value="RO">Romênia</option>
              <option value="RW">Ruanda</option>
              <option value="RU">Rússia</option>
              <option value="EH">Saara Ocidental</option>
              <option value="WS">Samoa</option>
              <option value="AS">Samoa Americana</option>
              <option value="SM">San Marino</option>
              <option value="SH">Santa Helena</option>
              <option value="LC">Santa Lúcia</option>
              <option value="BL">São Bartolomeu</option>
              <option value="KN">São Cristóvão e Nevis</option>
              <option value="MF">São Martinho</option>
              <option value="PM">São Pedro e Miquelão</option>
              <option value="ST">São Tomé e Príncipe</option>
              <option value="VC">São Vicente e Granadinas</option>
              <option value="SC">Seicheles</option>
              <option value="SN">Senegal</option>
              <option value="SL">Serra Leoa</option>
              <option value="RS">Sérvia</option>
              <option value="SG">Singapura</option>
              <option value="SY">Síria</option>
              <option value="SO">Somália</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudão</option>
              <option value="SS">Sudão do Sul</option>
              <option value="SE">Suécia</option>
              <option value="CH">Suíça</option>
              <option value="SR">Suriname</option>
              <option value="TJ">Tajiquistão</option>
              <option value="TH">Tailândia</option>
              <option value="TW">Taiwan</option>
              <option value="TZ">Tanzânia</option>
              <option value="IO">Território Britânico do Oceano Índico</option>
              <option value="TF">Territórios Franceses do Sul</option>
              <option value="TL">Timor-Leste</option>
              <option value="TG">Togo</option>
              <option value="TK">Tokelau</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad e Tobago</option>
              <option value="TN">Tunísia</option>
              <option value="TM">Turcomenistão</option>
              <option value="TR">Turquia</option>
              <option value="TV">Tuvalu</option>
              <option value="UA">Ucrânia</option>
              <option value="UG">Uganda</option>
              <option value="UY">Uruguai</option>
              <option value="UZ">Uzbequistão</option>
              <option value="VU">Vanuatu</option>
              <option value="VA">Vaticano</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Vietnã</option>
              <option value="WF">Wallis e Futuna</option>
              <option value="ZM">Zâmbia</option>
              <option value="ZW">Zimbábue</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              v-model="registerForm.email"
              type="email"
              placeholder="seu@email.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Senha</label
            >
            <input
              v-model="registerForm.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {{ loading ? "Criando..." : "Criar Conta" }}
          </button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">
          Já tem uma conta?
          <a
            href="#"
            @click.prevent="isRegistering = false"
            class="text-green-600 hover:text-green-700 font-medium"
            >Fazer login</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const isRegistering = ref(false);
const loading = ref(false);
const error = ref("");
const success = ref("");

const loginForm = ref({
  email: "",
  password: "",
});

const registerForm = ref({
  name: "",
  birthDate: "",
  nationality: "",
  email: "",
  password: "",
});

const handleLogin = async () => {
  error.value = "";
  loading.value = true;

  try {
    const res = await $fetch("/api/login", {
      method: "POST",
      body: loginForm.value,
    });
    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.user));
      if (res.user.role === "teacher") {
        await navigateTo("/teacher");
      } else {
        await navigateTo("/student");
      }
    }
  } catch (err) {
    error.value = err.data?.message || err.message || "Erro ao fazer login";
  } finally {
    loading.value = false;
  }
};

const handleRegister = async () => {
  error.value = "";
  success.value = "";
  loading.value = true;

  try {
    await $fetch("/api/register", {
      method: "POST",
      body: registerForm.value,
    });
    success.value = "Conta criada com sucesso!";
    registerForm.value = {
      name: "",
      birthDate: "",
      nationality: "",
      email: "",
      password: "",
    };
    setTimeout(() => {
      isRegistering.value = false;
    }, 1500);
  } catch (err) {
    error.value = err.data?.message || "Erro ao criar conta";
  } finally {
    loading.value = false;
  }
};
</script>
