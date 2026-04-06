<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl sm:text-2xl font-bold text-green-600">Área do Aluno</h1>
          </div>

          <nav class="hidden lg:flex items-center space-x-1">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="activeSection = item.id"
              :class="activeSection === item.id ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'"
              class="nav-link px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            >
              <span class="flex items-center gap-2">
                <component :is="item.icon" class="w-4 h-4" />
                <span class="hidden xl:inline">{{ item.label }}</span>
              </span>
            </button>
          </nav>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="hidden sm:block text-right">
                <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
                <p class="text-xs text-gray-500">Aluno</p>
              </div>
              <button @click="activeSection = 'about'" class="cursor-pointer relative">
                <div v-if="user?.photo" class="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 hover:border-green-600 transition-colors">
                  <img :src="user.photo" alt="Foto de perfil" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold border-2 border-transparent hover:border-green-600 transition-colors">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </div>
                <label @click.stop class="absolute bottom-0 right-0 cursor-pointer">
                  <input @change="handlePhotoUpload" type="file" accept="image/*" class="hidden" ref="photoInput" />
                  <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-green-700">+</div>
                </label>
              </button>
            </div>
            <button
              @click="handleLogout"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Sair"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="lg:hidden border-t border-gray-200 px-4 py-2">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="activeSection = item.id"
            :class="activeSection === item.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
            class="px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1"
          >
            <component :is="item.icon" class="w-3 h-3" />
            {{ item.label }}
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div v-if="activeSection === 'about'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex items-center gap-6">
            <div v-if="user?.photo" class="w-24 h-24 rounded-full overflow-hidden border-4 border-green-200">
              <img :src="user.photo" alt="Foto de perfil" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-green-200">
              {{ user?.name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ user?.name }}</h2>
              <p class="text-gray-500">Aluno</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Editar Perfil</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input v-model="editProfile.name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="editProfile.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
              <input v-model="editProfile.birthDate" type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
              <select v-model="editProfile.nationality" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Selecione</option>
                <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nova Senha (deixe em branco para manter)</label>
              <div class="relative">
                <input v-model="editProfile.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="saveProfile" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Salvar Alterações</button>
          </div>
        </div>
      </div>

      <div v-if="activeSection === 'appointments'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Agendamentos</h2>
            <p class="text-gray-500 mt-1">Solicite suas aulas</p>
          </div>
          <button
            @click="showAppointmentForm = true"
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Solicitar Aula
          </button>
        </div>

        <div v-if="showAppointmentSuccess" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
          <div class="flex items-center gap-2 text-green-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="font-medium">Agendamento enviado com sucesso! Aguarde a confirmação do professor.</span>
          </div>
        </div>

        <div v-if="showAppointmentForm" class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Solicitar Nova Aula</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título da aula</label>
              <input v-model="newAppointment.title" placeholder="Ex: Aula de Piano" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Data e hora</label>
              <input v-model="newAppointment.dateTime" type="datetime-local" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duração (minutos)</label>
              <input v-model="newAppointment.duration" type="number" placeholder="60" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea v-model="newAppointment.description" placeholder="Detalhes que queira enviar ao professor..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 h-20"></textarea>
            </div>
          </div>
          <div class="mt-4 flex gap-2 justify-end">
            <button @click="showAppointmentForm = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancelar</button>
            <button @click="createAppointment" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Enviar Solicitação</button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-900">Minhas Solicitações</h3>
          </div>
          <div class="divide-y divide-gray-100" v-if="appointments.length > 0">
            <div v-for="apt in appointments" :key="apt.id" class="p-4 hover:bg-gray-50 transition-colors">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-lg flex flex-col items-center justify-center" :class="apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : apt.status === 'scheduled' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    <span class="text-xs font-medium">{{ formatDateShort(apt.dateTime) }}</span>
                    <span class="text-lg font-bold">{{ formatDay(apt.dateTime) }}</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ apt.title }}</h4>
                    <p class="text-sm text-gray-500">{{ formatHour(apt.dateTime) }} • {{ apt.duration }}min</p>
                    <p v-if="apt.description" class="text-sm text-gray-400 mt-1">{{ apt.description }}</p>
                  </div>
                </div>
                <span :class="['px-3 py-1 rounded-full text-xs font-medium',
                  apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  apt.status === 'scheduled' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700']">
                  {{ apt.status === 'pending' ? 'Pendente' : apt.status === 'scheduled' ? 'Agendada' : 'Cancelada' }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center text-gray-500">
            Nenhuma solicitação de aula
          </div>
        </div>
      </div>

      <div v-if="activeSection === 'lessons'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Minhas Aulas</h2>
          <p class="text-gray-500 mt-1">Aulas confirmadas pelo professor</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="divide-y divide-gray-100" v-if="scheduledAppointments.length > 0">
            <div v-for="apt in scheduledAppointments" :key="apt.id" class="p-4 hover:bg-gray-50 transition-colors">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-lg bg-green-100 flex flex-col items-center justify-center text-green-700">
                    <span class="text-xs font-medium">{{ formatDateShort(apt.dateTime) }}</span>
                    <span class="text-lg font-bold">{{ formatDay(apt.dateTime) }}</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ apt.title }}</h4>
                    <p class="text-sm text-gray-500">{{ formatHour(apt.dateTime) }} • {{ apt.duration }}min</p>
                    <p v-if="apt.description" class="text-sm text-gray-400 mt-1">{{ apt.description }}</p>
                  </div>
                </div>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Agendada</span>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center text-gray-500">
            Nenhuma aula agendada
          </div>
        </div>
      </div>

      <div v-if="activeSection === 'messages'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Mensagens</h2>
            <p class="text-gray-500 mt-1">Conversa com sua professora</p>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col" style="min-height: 500px;">
          <div v-if="teacher" class="flex flex-col h-full">
            <div class="p-4 border-b border-gray-200 flex items-center gap-3">
              <div v-if="teacher.photo" class="w-10 h-10 rounded-full overflow-hidden">
                <img :src="teacher.photo" alt="" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                {{ teacher.name?.charAt(0).toUpperCase() }}
              </div>
              <span class="font-semibold text-gray-900">{{ teacher.name }}</span>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4" style="max-height: 350px;">
              <div v-for="msg in chatMessages" :key="msg.id" class="relative">
                <div :class="[
                  'flex',
                  msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                ]">
                  <div
                    @click="toggleMessageMenu(msg)"
                    :class="[
                      'max-w-xs lg:max-w-md p-3 rounded-lg cursor-pointer relative',
                      msg.senderId === user?.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-900'
                    ]"
                  >
                    <div v-if="msg.audioUrl" class="mb-1">
                      <div class="flex items-center gap-2 bg-black/20 rounded-full px-2 py-1 w-fit">
                        <button @click.stop="toggleAudio($event)" class="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/40 transition-colors" :data-audio="msg.audioUrl">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                        <div class="w-24">
                          <div class="h-1 bg-white/30 rounded-full overflow-hidden">
                            <div class="audio-progress h-full bg-white rounded-full" style="width: 0%" :data-audio="msg.audioUrl"></div>
                          </div>
                        </div>
                        <span class="text-xs text-white/70 audio-duration" :data-audio="msg.audioUrl">0:00</span>
                        <a :href="msg.audioUrl" download @click.stop class="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white/90">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                    <p v-if="msg.content">{{ msg.content }}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <span v-if="msg.reaction" class="text-lg">{{ msg.reaction }}</span>
                      <p :class="['text-xs', msg.senderId === user?.id ? 'text-green-100' : 'text-gray-500']">{{ formatDate(msg.createdAt) }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="selectedMessage?.id === msg.id" :class="['absolute', msg.senderId === user?.id ? 'right-0' : 'left-0', 'z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-2 mt-1']">
                  <div class="flex gap-1">
                    <button v-for="emoji in emojis" :key="emoji" @click="reactToMessage(msg.id, emoji)" class="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-lg">{{ emoji }}</button>
                  </div>
                  <button v-if="msg.senderId === user?.id" @click="deleteMessage(msg.id)" class="w-full mt-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm">Apagar</button>
                </div>
              </div>
              <div v-if="chatMessages.length === 0" class="text-center text-gray-500 py-8">
                Inicie uma conversa com {{ teacher.name }}
              </div>
            </div>
            <div class="p-4 border-t border-gray-200">
              <div class="flex gap-2">
                <button @click="toggleRecording" :class="['p-2 rounded-lg transition-colors', isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300']">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem..." class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                <button @click="sendMessage" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Enviar</button>
              </div>
              <p v-if="isRecording" class="text-sm text-red-500 mt-2 animate-pulse">Gravando áudio...</p>
            </div>
          </div>
          <div v-else class="flex-1 flex items-center justify-center text-gray-500 p-8">
            Professora não encontrada
          </div>
        </div>
      </div>

      <div v-if="activeSection === 'materials'" class="space-y-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Materiais Didáticos</h2>
          <p class="text-gray-500 mt-1">Materiais enviados pela professora</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="materials.length > 0">
          <div v-for="mat in materials" :key="mat.id" class="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md hover:border-green-200 transition-all">
            <div class="flex items-center gap-3 mb-3">
              <span :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                mat.type === 'pdf' ? 'bg-red-100 text-red-700' : mat.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              ]">
                {{ mat.type.toUpperCase() }}
              </span>
            </div>
            <h3 class="font-semibold text-gray-900">{{ mat.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ mat.description }}</p>
            <a v-if="mat.url" :href="mat.url" target="_blank" class="inline-flex items-center gap-1 mt-3 text-green-600 hover:text-green-700 text-sm font-medium">
              Acessar Material
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
          <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Nenhum material disponível</h3>
          <p class="mt-2 text-gray-500">Seus materiais aparecerão aqui</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const activeSection = ref('appointments')
const user = ref(null)
const photoInput = ref(null)

const AppointmentsIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' }
const LessonsIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }
const MessagesIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>' }
const MaterialsIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' }
const AboutIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }

const countries = ['Brasil', 'Argentina', 'Bolívia', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Estados Unidos', 'Canadá', 'México', 'Portugal', 'Espanha', 'França', 'Itália', 'Alemanha', 'Reino Unido', 'Outro']

const menuItems = [
  { id: 'about', label: 'Sobre', icon: AboutIcon },
  { id: 'appointments', label: 'Agendamentos', icon: AppointmentsIcon },
  { id: 'lessons', label: 'Aulas', icon: LessonsIcon },
  { id: 'messages', label: 'Mensagens', icon: MessagesIcon },
  { id: 'materials', label: 'Materiais', icon: MaterialsIcon }
]

const teacher = ref(null)
const appointments = ref([])
const materials = ref([])
const chatMessages = ref([])
const newMessage = ref('')
const selectedMessage = ref(null)
const isRecording = ref(false)
const mediaRecorder = ref(null)
const audioChunks = ref([])
const emojis = ['👍', '❤️', '😄', '😢', '😮', '🙏']
const showAppointmentForm = ref(false)
const showAppointmentSuccess = ref(false)
const newAppointment = ref({ title: '', description: '', dateTime: '', duration: 60 })
const editProfile = ref({ name: '', email: '', password: '', birthDate: '', nationality: '' })
const showPassword = ref(false)

const scheduledAppointments = computed(() => appointments.value.filter(a => a.status === 'scheduled'))

const formatDate = (date) => new Date(date).toLocaleString('pt-BR')
const formatDateShort = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', { month: 'short' })
}
const formatDay = (date) => new Date(date).getDate()
const formatHour = (date) => new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

const loadData = async () => {
  if (!user.value) return
  teacher.value = await $fetch('/api/teacher')
  appointments.value = await $fetch(`/api/my-appointments?userId=${user.value.id}`)
  materials.value = await $fetch(`/api/materials?userId=${user.value.id}`)
  await loadChat()
  editProfile.value = {
    name: user.value.name || '',
    email: user.value.email || '',
    password: '',
    birthDate: user.value.birthDate ? new Date(user.value.birthDate).toISOString().split('T')[0] : '',
    nationality: user.value.nationality || ''
  }
}

const loadChat = async () => {
  if (!user.value || !teacher.value) return
  const messages = await $fetch(`/api/messages?userId=${user.value.id}`)
  chatMessages.value = messages.filter(m =>
    (m.senderId === user.value.id && m.receiverId === teacher.value.id) ||
    (m.senderId === teacher.value.id && m.receiverId === user.value.id)
  ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}

const handlePhotoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (e) => {
    const photo = e.target.result
    await $fetch('/api/upload-photo', {
      method: 'POST',
      body: { userId: user.value.id, photo }
    })
    user.value.photo = photo
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  reader.readAsDataURL(file)
}

const saveProfile = async () => {
  if (!user.value) return
  const response = await $fetch('/api/profile', {
    method: 'PATCH',
    body: { id: user.value.id, ...editProfile.value }
  })
  user.value = { ...user.value, ...response.user }
  localStorage.setItem('user', JSON.stringify(user.value))
  alert('Perfil atualizado com sucesso!')
}

const createAppointment = async () => {
  if (!newAppointment.value.title || !newAppointment.value.dateTime || !teacher.value) {
    alert('Por favor, preencha o título e a data/hora')
    return
  }
  
  try {
    await $fetch('/api/my-appointments', {
      method: 'POST',
      body: {
        ...newAppointment.value,
        userId: user.value.id,
        teacherId: teacher.value.id
      }
    })
    newAppointment.value = { title: '', description: '', dateTime: '', duration: 60 }
    showAppointmentForm.value = false
    showAppointmentSuccess.value = true
    setTimeout(() => { showAppointmentSuccess.value = false }, 5000)
    await loadData()
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    alert('Erro ao enviar solicitação. Tente novamente.')
  }
}

const toggleMessageMenu = (msg) => {
  if (selectedMessage.value?.id === msg.id) {
    selectedMessage.value = null
  } else {
    selectedMessage.value = msg
  }
}

const reactToMessage = async (id, emoji) => {
  await $fetch('/api/messages/react', {
    method: 'PATCH',
    body: { id, reaction: emoji }
  })
  selectedMessage.value = null
  await loadChat()
}

const deleteMessage = async (id) => {
  await $fetch('/api/messages/delete', {
    method: 'POST',
    body: { id }
  })
  selectedMessage.value = null
  await loadChat()
}

const sendMessage = async (audioUrl = null) => {
  if (!newMessage.value.trim() && !audioUrl) return
  if (!teacher.value) return
  
  const payload = {
    content: newMessage.value,
    audioUrl,
    senderId: user.value.id,
    receiverId: teacher.value.id
  }
  console.log('Sending message:', payload)
  
  await $fetch('/api/messages', {
    method: 'POST',
    body: payload
  })
  newMessage.value = ''
  await loadChat()
}

const toggleRecording = async () => {
  if (isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  } else {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.value = new MediaRecorder(stream)
      audioChunks.value = []
      
      mediaRecorder.value.ondataavailable = (e) => {
        audioChunks.value.push(e.data)
      }
      
      mediaRecorder.value.onstop = async () => {
        const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.webm')
        
        const res = await $fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (res.success) {
          await sendMessage(res.url)
        }
        
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.value.start()
      isRecording.value = true
    } catch (err) {
      console.error('Erro ao acessar microfone:', err)
      alert('Não foi possível acessar o microfone')
    }
  }
}

const activeAudio = ref(null)

const toggleAudio = (event) => {
  const audioUrl = event.currentTarget.getAttribute('data-audio')
  const button = event.currentTarget
  const container = event.currentTarget.closest('.mb-1')
  
  if (!activeAudio.value) {
    const audio = new Audio(audioUrl)
    activeAudio.value = { audio, button, container, url: audioUrl }
    
    audio.addEventListener('loadedmetadata', () => {
      const durationSpan = container.querySelector('.audio-duration')
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration % 60)
      durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
    })
    
    audio.addEventListener('timeupdate', () => {
      const progress = container.querySelector('.audio-progress')
      const percent = (audio.currentTime / audio.duration) * 100
      progress.style.width = `${percent}%`
    })
    
    audio.addEventListener('ended', () => {
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
      container.querySelector('.audio-progress').style.width = '0%'
    })
    
    audio.play()
    button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
  } else if (activeAudio.value.url === audioUrl) {
    const audio = activeAudio.value.audio
    if (audio.paused) {
      audio.play()
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
    } else {
      audio.pause()
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
    }
  } else {
    activeAudio.value.audio.pause()
    
    const audio = new Audio(audioUrl)
    activeAudio.value = { audio, button, container, url: audioUrl }
    
    audio.addEventListener('loadedmetadata', () => {
      const durationSpan = container.querySelector('.audio-duration')
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration % 60)
      durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
    })
    
    audio.addEventListener('timeupdate', () => {
      const progress = container.querySelector('.audio-progress')
      const percent = (audio.currentTime / audio.duration) * 100
      progress.style.width = `${percent}%`
    })
    
    audio.addEventListener('ended', () => {
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
      container.querySelector('.audio-progress').style.width = '0%'
    })
    
    audio.play()
    button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
  }
}

const handleLogout = async () => {
  localStorage.removeItem('user')
  await navigateTo('/')
}

onMounted(async () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    await loadData()
  } else {
    await navigateTo('/')
  }
})
</script>

<style scoped>
.nav-link {
  @apply relative;
}
.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300;
}
.nav-link:hover::after {
  @apply w-full;
}
</style>